import clsx from 'clsx';
import React from 'react';

/**
 *
 * @param {{ value: File[], onChange: (newValue: File[] | (prev: File[]) => File[]) => void }} param0
 * @returns
 */
export default function ImageUploader({ value, onChange, ...divProps }) {
  const handleChange = (event) => {
    const files = [...event.target.files].map(
      (file) => (file.name += '-' + Math.round(Math.random() * 1e9)),
    );
    onChange(files);
  };

  return (
    <div {...divProps} className={clsx('vano-image-uploader', divProps.className)}>
      <div>
        {value.map((image) => (
          <div key={image.name}>{image.name}</div>
        ))}
        <input type="file" onChange={handleChange} multiple={true} />
      </div>
    </div>
  );
}
