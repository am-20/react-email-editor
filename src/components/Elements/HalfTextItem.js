import { useState } from 'react';

/**
 * Half‑Text block:
 * • Image left or right
 * • Editable, aligned text
 * • OPTIONAL button rendered as a linked image (same UX as ButtonItem)
 */
export default function HalfText() {
  /* ------------ layout / image ---------------- */
  const [imgSrc, setImgSrc] = useState();
  const [imgSide, setImgSide] = useState('left'); // 'left' | 'right'

  /* ------------ text -------------------------- */
  const [text, setText] = useState('Your text here…');
  const [edit, setEdit] = useState(false);
  const [align, setAlign] = useState('left'); // 'left' | 'center' | 'right'

  /* ------------ optional button --------------- */
  const [showBtn, setShowBtn] = useState(false);
  const [btnSrc, setBtnSrc] = useState();
  const [btnLink, setBtnLink] = useState('');

  /* ------------ helpers ----------------------- */
  const imageCell = (
    <td
      style={{
        verticalAlign: 'top',
        paddingRight: imgSide === 'left' ? 12 : 0,
        paddingLeft: imgSide === 'right' ? 12 : 0,
      }}>
      {imgSrc && (
        <img
          src={imgSrc}
          alt='Half block'
          style={{ maxWidth: 200, height: 'auto', display: 'block' }}
        />
      )}
      <input
        type='file'
        accept='image/*'
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) setImgSrc(URL.createObjectURL(file));
        }}
        style={{ marginTop: 8 }}
      />
    </td>
  );

  const textCell = (
    <td style={{ verticalAlign: 'top', width: '100%' }}>
      {edit ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => setEdit(false)}
          style={{ width: '100%' }}
        />
      ) : (
        <div
          onClick={() => setEdit(true)}
          style={{ cursor: 'pointer', textAlign: align }}
          dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }}
        />
      )}

      {showBtn && (
        <div style={{ marginTop: 12, textAlign: align }}>
          <a href={btnLink} target='_blank' rel='noopener noreferrer'>
            <img
              src={btnSrc}
              alt='Button'
              style={{ maxWidth: '100%', display: 'block' }}
            />

            <input
              type='file'
              accept='image/*'
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setBtnSrc(URL.createObjectURL(file));
              }}
              style={{ marginTop: 8 }}
            />
          </a>
        </div>
      )}
    </td>
  );

  /* ------------ render ------------------------ */
  return (
    <table
      width='100%'
      cellPadding='0'
      cellSpacing='0'
      style={{ borderCollapse: 'collapse' }}>
      <tbody>
        <tr>
          {imgSide === 'left' ? imageCell : textCell}
          {imgSide === 'left' ? textCell : imageCell}
        </tr>

        {/* controls row -------------------------------------------------- */}
        <tr>
          <td
            colSpan={2}
            style={{
              paddingTop: 12,
              fontSize: 12,
              borderTop: '1px solid #eee',
            }}>
            {/* image side */}
            <label style={{ marginRight: 16 }}>
              Image&nbsp;
              <select
                value={imgSide}
                onChange={(e) => setImgSide(e.target.value)}>
                <option value='left'>left</option>
                <option value='right'>right</option>
              </select>
            </label>

            {/* text align */}
            <label style={{ marginRight: 16 }}>
              Text&nbsp;
              <select value={align} onChange={(e) => setAlign(e.target.value)}>
                <option value='left'>left</option>
                <option value='center'>center</option>
                <option value='right'>right</option>
              </select>
            </label>

            {/* button toggle */}
            <label>
              <input
                type='checkbox'
                checked={showBtn}
                onChange={(e) => setShowBtn(e.target.checked)}
              />{' '}
              Show button
            </label>

            {/* button editors (only when enabled) */}
            {showBtn && (
              <>
                <input
                  type='text'
                  placeholder='Button link URL'
                  value={btnLink}
                  onChange={(e) => setBtnLink(e.target.value)}
                  style={{ marginLeft: 12, width: 260 }}
                />

                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setBtnSrc(URL.createObjectURL(file));
                  }}
                  style={{ marginLeft: 12 }}
                />
              </>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
