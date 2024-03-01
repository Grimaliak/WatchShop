import React from 'react';
import { Row, Stack } from 'react-bootstrap';

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '20px',
      }}
    >
      <Stack className="align-items-center" gap={3}>
        <Row>Контактная информация: yourbestwatch@gmail.com</Row>
        <Row>
          <Stack direction="horizontal" gap={3}>
            {[
              {
                src: 'telegram_icon.png',
                href: '#',
                alt: 'Telegram',
              },
              {
                src: 'instagram_icon.png',
                href: 'https://www.instagram.com/',
                alt: 'Instagram',
              },
            ].map((link) => (
              <a href={link.href}>
                <img
                  src={link.src}
                  alt={link.alt}
                  style={{
                    width: '30px',
                    height: '30px',
                    marginRight: '10px',
                    filter: 'invert(1)',
                  }}
                />
              </a>
            ))}
          </Stack>
        </Row>
      </Stack>
    </footer>
  );
}

export default Footer;
