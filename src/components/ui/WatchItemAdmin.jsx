import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import ImageUploader from './ImageUploader';

export default function WatchItemAdmin({ onDelete, onSubmit, watch }) {
  const [loadingImages, setLoadingImages] = useState(true);
  const [initialImages, setInitialImages] = useState([]);
  const [input, setInput] = useState({
    images: [],
    name: watch.name,
    description: watch.description,
  });

  const handleChange = (event) => {
    setInput((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const images = useMemo(() => input.images, [input.images]);

  const setFiles = (newImages) => {
    setInput((prev) => ({
      ...prev,
      images: typeof newImages === 'function' ? newImages(prev.images) : newImages,
    }));
  };

  const isChanged = useMemo(() => {
    const inputImageNames = [...new Set(input.images.map((image) => image.name))];
    const savedImageNames = [...new Set(watch.Images.map((image) => image.name))];
    return (
      input.name !== watch.name ||
      input.description !== watch.description ||
      inputImageNames.length !== savedImageNames.length ||
      inputImageNames.some((name) => !savedImageNames.includes(name))
    );
  }, [input, watch]);

  // -------------------------------- HANDLERS --------------------------------------

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    images.forEach((file) => {
      formData.append('images', file);
    });
    onSubmit(watch.id, formData);
  };

  const handleDelete = () => {
    onDelete(watch.id);
  };

  const handleCancel = () => {
    setInput({
      images: initialImages,
      name: watch.name,
      description: watch.description,
    });
  };

  // ---------------------- USE EFFECTS ----------------------------
  
  // loading images as File blobs and reset input
  useEffect(() => {
    Promise.all(
      watch.Images.map((image) => {
        return fetch(image.path)
          .then((res) => res.blob())
          .then((blob) => new File([blob], image.name));
      }),
    )
      .then((files) => {
        setInitialImages(files);
        setInput({
          images: files,
          name: watch.name,
          description: watch.description,
        });
      })
      .catch(console.log)
      .finally(() => {
        setLoadingImages(false);
      });
  }, [watch]);

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group className="mb-3 w-100">
            <Form.Label>Загрузка фотографий</Form.Label>
            {images && (
              <ImageUploader
                isLoading={loadingImages}
                value={images}
                onChange={setFiles}
                rootProps={{ style: { width: '100%' } }}
              />
            )}
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={input.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={3}
              value={input.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Stack direction="horizontal" gap={2}>
            {isChanged && (
              <>
                <Button variant="primary" active onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="secondary" active type="submit">
                  Save
                </Button>
              </>
            )}
            <Button variant="danger" active onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </Col>
      </Row>
    </Form>
  );
}
