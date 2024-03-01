import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import ImageUploader from './ImageUploader';

export default function WatchItemAdmin({ onDelete, onSubmit, watch }) {
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [files, setFiles] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    files.forEach((file) => {
      formData.append('images', file);
    });
    console.log(Object.fromEntries(formData));
    onSubmit(watch.id, formData);
  };

  const handleDelete = (event) => {
    onDelete(watch.id);
  };

  const handleCancel = (event) => {
    console.log('cancel success');
  };

  useEffect(() => {
    setLoadingFiles(true);
    Promise.all(
      watch.Images.map((image) => {
        return fetch(image.path)
          .then((res) => res.blob())
          .then((blob) => new File([blob], image.name));
      }),
    ).then((files) => {
      setFiles(files);
    })
    .catch(console.log)
    .finally(() => {
      setLoadingFiles(false);
    })
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col className="d-flex flex-column justify-content-between align-items-center">
          <Form.Group controlId="formFile" className="mb-3 w-100">
            <Form.Label>Загрузка фотографий</Form.Label>
            <ImageUploader
              isLoading={loadingFiles}
              value={files}
              onChange={setFiles}
              rootProps={{ style: { width: '100%' } }}
            />
          </Form.Group>
          <div>
            <Button variant="secondary" active onClick={handleDelete}>
              Удалить часы
            </Button>
          </div>
        </Col>

        <Col className="pr-3">
          <Form.Group controlId="name">
            <Form.Label>Название</Form.Label>
            <Form.Control type="text" name="name" defaultValue={watch.name} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={3}
              defaultValue={watch.description}
            />
          </Form.Group>
          <Stack direction="horizontal" gap={2}>
            <Button variant="primary" active onClick={handleCancel}>
              Отменить изменения
            </Button>
            <Button variant="secondary" active type="submit">
              Сохранить изменения
            </Button>
          </Stack>
        </Col>
      </Row>
    </Form>
  );
}
