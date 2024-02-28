import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

export default function WatchItemAdmin({ onDelete, onSubmit, watch }) {
  return (
    <Form onSubmit={onSubmit}>
      <Row className="mb-3">
        <Col className="d-flex flex-column justify-content-between align-items-center">
          <div>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Блок загрузки фотографий</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </div>
          <div>
            <Button variant="secondary" size="lg" active onClick={() => onDelete(watch.id)}>
              Удалить часы
            </Button>
          </div>
        </Col>

        <Col className="pr-3">
          <Form.Label htmlFor="inputPassword5">Название</Form.Label>
          <Form.Control
            type="text"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            defaultValue={watch.name}
          />
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Описание</Form.Label>
            <Form.Control as="textarea" rows={3} defaultValue={watch.description} />
          </Form.Group>
          <Button variant="primary" size="lg" active>
            Отменить изменения
          </Button>{' '}
          <Button variant="secondary" size="lg" active>
            Сохранить изменения
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
