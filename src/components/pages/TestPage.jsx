import React, { useState } from 'react'
import ImageUploader from '../ui/ImageUploader';

export default function TestPage() {

  const [files, setFiles] = useState([]);

  return (
    <div>
      <h1>TestPage</h1>
      <ImageUploader value={files} onChange={setFiles} />
    </div>
  )
}
