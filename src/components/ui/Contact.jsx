import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const footerStyles = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '20px',
};

const iconStyles = {
  width: '30px',
  height: '30px',
  marginRight: '10px',
};

function Footer() {
  return (
    <footer style={footerStyles}>
      <Container className="text-center">
        <Row>
          <Col md={12}>
            <div>Контактная информация: yourbestwatch@gmail.com</div>
          </Col>
          <Col md={12} className="text-right">
            <a href="/">
              <img
                src="telegram_icon.png"
                alt="Telegram"
                style={iconStyles}
              />
            </a>
            <a href="/">
              <img
                src="instagram_icon.png"
                alt="Instagram"
                style={iconStyles}
              />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
