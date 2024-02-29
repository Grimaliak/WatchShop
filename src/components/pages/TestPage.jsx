import React, { useState } from 'react'
import ImageUploader from '../ui/ImageUploader';

export default function TestPage() {

  const [files, setFiles] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(files)
  }

  return (
    <div>
      <h1>TestPage</h1>
      <form onSubmit={handleSubmit}>
        <ImageUploader value={files} onChange={setFiles} />
        <button>submit</button>
      </form>
    </div>
  )
}
