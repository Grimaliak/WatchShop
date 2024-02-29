import React from 'react';
import Hero from '../ui/Hero';
import WatchItemClient from '../ui/WatchItemClient';
import WatchItemAdmin from '../ui/WatchItemAdmin';
import ClientDataSubmitter from '../ui/ClientDataSubmitter';
import axios from 'axios';
import { Container } from 'react-bootstrap';

export default function IndexPage({ watches, user }) {
  const handleDelete = async (id) => {
    await axios.delete(`/api/watches/${id}`);
    window.location.reload();
  };

  const handleSubmit = async (id, formData) => {
    const res = await fetch(`/api/watches/${id}`, formData);
    if (res.ok) {
      console.log('watch successfully submitted');
    } else {
      alert('watch failure');
    }
    // window.location.reload()
  };

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {user ? (
        <>
          <Hero />
          {watches?.map((watch) => (
            <WatchItemAdmin
              key={watch.id}
              watch={watch}
              onDelete={handleDelete}
              onSubmit={handleSubmit}
            />
          ))}
        </>
      ) : (
        <>
          <Hero />
          {watches?.map((watch) => (
            <WatchItemClient key={watch.id} watch={watch} />
          ))}
          <ClientDataSubmitter className="mb-3" style={{ maxWidth: '500px' }} />
        </>
      )}
    </Container>
  );
}
