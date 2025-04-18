import { useState } from 'react';

export default function ButtonItem() {
  const [src, setSrc] = useState();
  const [link, setLink] = useState('https://www.samsung.com/kz_ru/');

  return (
    <div style={{ textAlign: 'center' }}>
      <a href={link} target='_blank' rel='noopener noreferrer'>
        <img src={src} alt='Button' style={{ maxWidth: '100%' }} />
      </a>
      <div style={{ marginTop: '8px' }}>
        <input
          type='text'
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder='Enter URL'
          style={{ width: '100%', marginBottom: '8px' }}
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
    </div>
  );
}
