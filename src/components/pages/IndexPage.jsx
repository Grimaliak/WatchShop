import React from 'react';
import Hero from '../ui/Hero';
import ClientDataSubmitter from '../ui/ClientDataSubmitter';
import { Container, Stack } from 'react-bootstrap';
import WatchList from '../ui/WatchList';

export default function IndexPage({ watches: initialWatches, user }) {
  return (
    <Container className="vano-index-page">
      <Stack direction="vertical" gap={3}>
        <Hero />
        <WatchList editable={!!user} watches={initialWatches} />
        {!user && <ClientDataSubmitter className="mb-3" />}
      </Stack>
    </Container>
  );
}
