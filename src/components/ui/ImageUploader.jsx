import clsx from 'clsx';
import React, { useMemo } from 'react';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { BsCloudUpload } from "react-icons/bs";

/**
 *
 * @param {{ value: File[], onChange: (newValue: File[] | (prev: File[]) => File[]) => void }} param0
 * @returns
 */
export default function ImageUploader({ value, onChange, ...divProps }) {
  const handleChange = (event) => {
    const files = [...event.target.files];
    onChange((prev) => {
      const names = prev.map((item) => item.name);
      const filteredFiles = files.filter((item) => !names.includes(item.name));
      return [...prev, ...filteredFiles]
    });
  };

  const handleDelete = (index) => {
    onChange((prev) => prev.filter((_, i) => i !== index));
  };

  const normalizedImages = useMemo(() => {
    return value.map((image) => ({ file: image, base64Str: URL.createObjectURL(image) }));
  }, [value]);

  return (
    <div {...divProps} className={clsx('vano-image-uploader', divProps.className)}>
      <div>
        <div className="vano-drag-and-drop-box">
          <div className="vano-drag-and-drop-text flex flex-col gap-2 align-center">
            <span>

            Загрузите изображения
            </span>
            <BsCloudUpload style={{ fontSize: '50px' }} />
          </div>
          <input
            className="vano-drag-and-drop-input"
            type="file"
            onChange={handleChange}
            multiple={true}
          />
        </div>
        {normalizedImages.map((normalizedImage, i) => (
          <div className="vano-image-uploader-item" key={normalizedImage.name}>
            <img
              className="vano-image-uploader-item-image"
              src={normalizedImage.base64Str}
              style={{ width: '100px', height: '100px', objectFit: 'contain' }}
            />
            <div className="vano-image-uploader-item-right">
              <div className="flex justify-between gap-2">
                <strong>{normalizedImage.file.name}</strong>
                <BsFillTrash3Fill
                  onClick={() => handleDelete(i)}
                  className="vano-image-uploader-trash-delete-icon"
                  style={{
                    color: 'red',
                    fontSize: '20px',
                  }}
                />
              </div>
              <div className="flex justify-between gap-2">
                <span>{(normalizedImage.file.size * 0.001).toFixed(2)} KB</span>
                <span>{normalizedImage.file.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
