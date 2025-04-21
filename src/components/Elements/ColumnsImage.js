import { useState, useRef } from 'react';

export default function ColumnsImage() {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImages((prev) => [...prev, url]);

    // Reset the input so the same file can be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemove = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <table width='100%' cellPadding='0' cellSpacing='0'>
      <tbody>
        <tr>
          <td>
            <table width='100%' cellPadding='0' cellSpacing='0'>
              <tbody>
                <tr>
                  {images.map((src, index) => (
                    <td
                      key={index}
                      style={{
                        width: `${100 / images.length}%`,
                        padding: '4px',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                      }}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                        }}>
                        <a href={src} target='_blank' rel='noopener noreferrer'>
                          <img
                            src={src}
                            alt={`Image-${index}`}
                            style={{
                              maxWidth: '100%',
                              height: 'auto',
                              display: 'block',
                              marginBottom: '4px',
                            }}
                          />
                        </a>
                        <button onClick={() => handleRemove(index)}>
                          Remove
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <input
              type='file'
              accept='image/*'
              onChange={handleAddImage}
              ref={fileInputRef}
              style={{ marginTop: '10px' }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
