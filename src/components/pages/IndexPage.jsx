import React from 'react';
import Hero from '../ui/Hero';
import WatchItemClient from '../ui/WatchItemClient';
import WatchItemAdmin from '../ui/WatchItemAdmin';

export default function IndexPage({ watches, user }) {

  const handleDelete = (id) => {

  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <>
      <span>{JSON.stringify(user)}</span>

      {!user ? (
        <>
          <Hero />
          <span>admin defined</span>
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
    </>
  );
}
