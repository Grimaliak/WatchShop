import React from 'react';
import Hero from '../ui/Hero';
import WatchItemClient from '../ui/WatchItemClient';
import WatchItemAdmin from '../ui/WatchItemAdmin';
import axios from 'axios';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default function IndexPage({ watches, user }) {

  const handleDelete = async (id) => {
    await axios.delete(`/api/watches/${id}`)
    window.location.reload()
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`/api/watches/${id}`, {
      name: event.target.name.value,
      description: event.target.description.value,
    })
    window.location.reload()
  }

  return (
    <div style={containerStyle}>
      {user ? (
        <>
          <Hero />
          {watches?.map((watch) => (
            <WatchItemAdmin key={watch.id} watch={watch} onDelete={handleDelete} onSubmit={handleSubmit} />
          ))}
        </>
      ) : (
        <>
          <Hero />
          {watches?.map((watch) => (
            <WatchItemClient key={watch.id} watch={watch} />
          ))}
        </>
      )}
    </div>
  );
}
