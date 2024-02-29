import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ImageUploader from './ImageUploader';
import { toast } from 'react-toastify';

export default function ClientDataSubmitter() {

  const [files, setFiles] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    files.forEach((file) => {
      formData.append('blueprints', file);
    })
    const res = await fetch("/api/clients", { method: "POST", body: formData });
    if (res.ok) {
      toast("success")
    } else {
      toast("failure")
    }
    console.log(Object.fromEntries(formData));
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Имя</Form.Label>
          <Form.Control type="text" placeholder="Имя" name="name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Номер телефона</Form.Label>
          <Form.Control type="text" placeholder="Телефон" name="phone" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Почта</Form.Label>
          <Form.Control type="email" placeholder="Почта" name="email" />
        </Form.Group>

        <ImageUploader value={files} onChange={setFiles} />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
