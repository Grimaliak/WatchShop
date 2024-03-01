import React, { useState } from 'react';
import { Stack, Button } from 'react-bootstrap';
import WatchItemClient from '../ui/WatchItemClient'
import WatchItemAdmin from './WatchItemAdmin';
import { toast } from 'react-toastify'

export default function WatchList({ editable, watches: initialWatches }) {
  const [watches, setWatches] = useState(initialWatches);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/watches/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setWatches((prev) => prev.filter((watch) => watch.id !== id));
    } else {
      toast(`failed to delete watch ${res.status} ${res.statusText}`);
    }
  };

  const handleSubmit = async (id, formData) => {
    const res = await fetch(`/api/watches/${id}`, { method: 'PUT', body: formData });
    if (res.ok) {
      const newWatch = await res.json();
      setWatches((prev) => {
        const index = prev.findIndex((item) => item.id === newWatch.id);
        if (index === -1) throw new Error(`tried to find updated watch in watch list, and not found, id: ${newWatch.id}`);
        prev[index] = newWatch;
        return [...prev];
      })
      toast('Saved successfully');
    } else {
      toast(`Failed to submit update for watch ${res.status} ${res.statusText}`);
    }
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
    } else {
      toast(`failed when adding new watch' ${res.status} ${res.statusText} ${await res.text()}`);
    }
  };

  return (
    <Stack direction="vertical" gap={3} id="watch-list">
      {editable ? (
        <>
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
          <Button variant="primary" onClick={handleAdd} className="mb-3" style={{ alignSelf: 'end' }}>
            Add Watch
          </Button>
        </>
      ) : (
        <>
          <Stack direction="vertical" gap={3} className="my-3">
            {watches?.map((watch) => (
              <WatchItemClient key={watch.id} watch={watch} />
            ))}
          </Stack>
        </>
      )}
    </Stack>
  );
}
