import { useState } from 'react';

/**
 * Two independent buttons that can sit side‑by‑side (inline)
 * or one under the other (stacked).
 *
 * Each button = image + URL picker, identical to ButtonItem.
 */
export default function ButtonGroup() {
  /* two button objects: { src, link } */
  const [buttons, setButtons] = useState([
    { src: undefined, link: '' },
    { src: undefined, link: '' },
  ]);

  const [inline, setInline] = useState(true);

  /* ---------- helpers ---------- */
  const updateButton = (idx, patch) =>
    setButtons((prev) =>
      prev.map((b, i) => (i === idx ? { ...b, ...patch } : b))
    );

  /* ---------- render ---------- */
  return (
    <div style={{ textAlign: 'center' }}>
      {/* visual preview */}
      <div
        style={{
          display: inline ? 'flex' : 'block',
          justifyContent: 'center',
          gap: inline ? 12 : 0,
        }}>
        {buttons.map(({ src, link }, i) => (
          <a
            key={i}
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            style={{
              display: inline ? 'inline-block' : 'block',
              marginBottom: inline ? 0 : 12,
            }}>
            <img
              src={src}
              alt={`Button ${i + 1}`}
              style={{ maxWidth: '100%' }}
            />
          </a>
        ))}
      </div>

      {/* editor ------------------------------------------------------- */}
      <div style={{ marginTop: 12, textAlign: 'left' }}>
        {/* inline toggle */}
        <label style={{ display: 'block', marginBottom: 8 }}>
          <input
            type='checkbox'
            checked={inline}
            onChange={(e) => setInline(e.target.checked)}
          />{' '}
          Inline mode (side‑by‑side)
        </label>

        {buttons.map(({ src, link }, i) => (
          <div
            key={i}
            style={{
              padding: '8px 0',
              borderTop: i === 1 ? '1px solid #ddd' : 'none',
            }}>
            <strong>Button {i + 1}</strong>
            <input
              type='text'
              placeholder='Enter URL'
              value={link}
              onChange={(e) => updateButton(i, { link: e.target.value })}
              style={{
                display: 'block',
                width: '100%',
                margin: '6px 0 8px',
              }}
            />
            <input
              type='file'
              accept='image/*'
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) updateButton(i, { src: URL.createObjectURL(file) });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
