import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ImageUploader from './ImageUploader';
import { toast } from 'react-toastify';

export default function ClientDataSubmitter(props) {
  const [files, setFiles] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    files.forEach((file) => {
      formData.append('blueprints', file);
    });
    const res = await fetch('/api/clients', { method: 'POST', body: formData });
    if (res.ok) {
      toast('Ваша заявка принята, проверьте почту');
      event.target.reset();
      setFiles([]);
    } else {
      toast(
        `Не удалось отправить заявку, статус ${res.status} ${res.statusText} ${await res.text()}`,
      );
    }
    console.log(Object.fromEntries(formData));
  };

  return (
    <Container {...props}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" name="name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" placeholder="Phone" name="phone" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" name="email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <ImageUploader value={files} onChange={setFiles} name="blueprints" />
        </Form.Group>

        <Form.Group className="flex justify-end">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
