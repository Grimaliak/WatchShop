import React, { useState } from 'react';
import Hero from '../ui/Hero';
import WatchItemClient from '../ui/WatchItemClient';
import WatchItemAdmin from '../ui/WatchItemAdmin';
import ClientDataSubmitter from '../ui/ClientDataSubmitter';
import axios from 'axios';
import { Button, Container, Stack } from 'react-bootstrap';

export default function IndexPage({ watches: initialWatches, user }) {
  const [watches, setWatches] = useState(initialWatches);

  const handleDelete = async (id) => {
    await axios.delete(`/api/watches/${id}`);
    window.location.reload();
  };

  const handleSubmit = async (id, formData) => {
    const res = await fetch(`/api/watches/${id}`, { method: 'PUT', body: formData });
    if (res.ok) {
      console.log('watch successfully submitted');
    } else {
      alert('watch failure');
    }
    // window.location.reload()
  };

  const handleAdd = async (event) => {
    const data = { name: 'Unnamed', description: '-', images: [] };
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    const res = await fetch('/api/watches', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const newWatch = await res.json();
      setWatches((prev) => [...prev, newWatch]);
      console.log('ok');
    } else {
      console.log('failed when adding new watch', res.status, res.statusText, await res.text());
    }
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
          <Stack direction="vertical" gap={3} className="my-3">
            {watches?.map((watch) => (
              <WatchItemAdmin
                key={watch.id}
                watch={watch}
                onDelete={handleDelete}
                onSubmit={handleSubmit}
              />
            ))}
          </Stack>
          <Button variant="primary" onClick={handleAdd} className="mb-3">
            Add Watch
          </Button>
        </>
      ) : (
        <>
          <Hero />
          <Stack direction='vertical' gap={3} className="my-3">
            {watches?.map((watch) => (
              <WatchItemClient key={watch.id} watch={watch} />
            ))}
          </Stack>
          <ClientDataSubmitter className="mb-3" />
        </>
      )}
    </Container>
  );
}
