import { useState } from 'react';

/* helper: convert a selected file to a base‑64 data‑URI */
const fileToDataURI = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });

export default function ImageItem() {
  const [src, setSrc] = useState('');

  return (
    <>
      {/* the email‑ready image */}
      {src && (
        <img src={src} alt='' style={{ width: '100%', display: 'block' }} />
      )}

      {/* editor‑only controls */}
      <div data-editor style={{ marginTop: 8 }}>
        <input
          type='file'
          accept='image/*'
          onChange={async (e) => {
            const file = e.target.files[0];
            if (file) setSrc(await fileToDataURI(file));
          }}
        />
        <input
          type='text'
          placeholder='Paste image URL'
          value={src.startsWith('data:') ? '' : src}
          onChange={(e) => setSrc(e.target.value)}
          style={{ width: '100%', marginTop: 4 }}
        />
      </div>
    </>
  );
}
