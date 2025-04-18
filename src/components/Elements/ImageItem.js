import { useState } from 'react';

export default function ImageItem() {
  const [src, setSrc] = useState();

  return (
    <div>
      <img
        src={src}
        alt='Uploaded'
        style={{ width: '100%', display: 'block' }}
      />
      <input
        type='file'
        accept='image/*'
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) setSrc(URL.createObjectURL(file));
        }}
      />
    </div>
  );
}
