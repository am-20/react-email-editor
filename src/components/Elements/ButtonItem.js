import { useState } from 'react';

const fileToDataURI = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });

export default function ButtonItem() {
  const [imgSrc, setImgSrc] = useState('');
  const [link, setLink] = useState('');

  return (
    <>
      {/* centred button for the email preview */}
      <div style={{ textAlign: 'center' }}>
        <a href={link} target='_blank' rel='noopener noreferrer'>
          {imgSrc && <img src={imgSrc} alt='' style={{ maxWidth: '100%' }} />}
        </a>
      </div>

      {/* editor‑only controls */}
      <div data-editor style={{ marginTop: 8 }}>
        <input
          type='text'
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder='Enter button link'
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          type='file'
          accept='image/*'
          onChange={async (e) => {
            const file = e.target.files[0];
            if (file) setImgSrc(await fileToDataURI(file));
          }}
        />
        <input
          type='text'
          placeholder='Paste image URL'
          value={imgSrc.startsWith('data:') ? '' : imgSrc}
          onChange={(e) => setImgSrc(e.target.value)}
          style={{ width: '100%', marginTop: 4 }}
        />
      </div>
    </>
  );
}
