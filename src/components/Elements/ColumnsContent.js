import { useState, useRef } from 'react';

export default function ColumnsContent() {
  const [columns, setColumns] = useState([]);
  const fileInputRefs = useRef({});

  const handleAddColumn = () => {
    setColumns((prev) => [
      ...prev,
      {
        title: '',
        text: '',
        image: '',
        buttonImage: '',
        buttonUrl: '',
        groupButtons: [],
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...columns];
    updated[index][field] = value;
    setColumns(updated);
  };

  const handleImageUpload = (index, file, field = 'image') => {
    const url = URL.createObjectURL(file);
    handleChange(index, field, url);
    if (fileInputRefs.current[index]?.[field]) {
      fileInputRefs.current[index][field].value = '';
    }
  };

  const handleRemove = (index) => {
    setColumns((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <table width='100%' cellPadding='0' cellSpacing='0'>
        <tbody>
          <tr>
            <td>
              <table width='100%' cellPadding='0' cellSpacing='0'>
                <tbody>
                  <tr>
                    {columns.map((col, index) => (
                      <td
                        key={index}
                        style={{
                          width: `${100 / columns.length}%`,
                          padding: '8px',
                          textAlign: 'center',
                          verticalAlign: 'top',
                        }}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}>
                          <input
                            type='text'
                            placeholder='Title'
                            value={col.title}
                            onChange={(e) =>
                              handleChange(index, 'title', e.target.value)
                            }
                            style={{ width: '100%', marginBottom: '6px' }}
                          />
                          <textarea
                            placeholder='Text'
                            value={col.text}
                            onChange={(e) =>
                              handleChange(index, 'text', e.target.value)
                            }
                            style={{ width: '100%', marginBottom: '6px' }}
                          />
                          {col.image && (
                            <img
                              src={col.image}
                              alt='Uploaded'
                              style={{
                                maxWidth: '100%',
                                height: 'auto',
                                marginBottom: '6px',
                              }}
                            />
                          )}
                          <input
                            type='file'
                            accept='image/*'
                            ref={(el) => {
                              fileInputRefs.current[index] =
                                fileInputRefs.current[index] || {};
                              fileInputRefs.current[index].image = el;
                            }}
                            onChange={(e) =>
                              handleImageUpload(
                                index,
                                e.target.files[0],
                                'image'
                              )
                            }
                            style={{ marginBottom: '6px' }}
                          />

                          <input
                            type='text'
                            placeholder='Button URL'
                            value={col.buttonUrl}
                            onChange={(e) =>
                              handleChange(index, 'buttonUrl', e.target.value)
                            }
                            style={{ width: '100%', marginBottom: '6px' }}
                          />
                          {col.buttonImage && col.buttonUrl && (
                            <a
                              href={col.buttonUrl}
                              target='_blank'
                              rel='noopener noreferrer'
                              style={{ marginBottom: '6px' }}>
                              <img
                                src={col.buttonImage}
                                alt='Button'
                                style={{
                                  maxWidth: '100%',
                                  height: 'auto',
                                  display: 'block',
                                }}
                              />
                            </a>
                          )}
                          <input
                            type='file'
                            accept='image/*'
                            ref={(el) => {
                              fileInputRefs.current[index] =
                                fileInputRefs.current[index] || {};
                              fileInputRefs.current[index].buttonImage = el;
                            }}
                            onChange={(e) =>
                              handleImageUpload(
                                index,
                                e.target.files[0],
                                'buttonImage'
                              )
                            }
                            style={{ marginBottom: '6px' }}
                          />
                          <button
                            onClick={() => handleRemove(index)}
                            style={{ marginTop: '8px' }}>
                            Remove
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
              <button onClick={handleAddColumn} style={{ marginTop: '12px' }}>
                Add Column
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
