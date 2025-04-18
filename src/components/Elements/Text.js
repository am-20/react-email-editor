import { useState } from 'react';

export default function Text() {
  const [text, setText] = useState('Your Text Here');
  const [editing, setEditing] = useState(false);

  return (
    <table
      width='100%'
      cellPadding='0'
      cellSpacing='0'
      style={{ borderCollapse: 'collapse' }}>
      <tbody>
        <tr>
          <td align='center' style={{ fontSize: '24px', padding: 0 }}>
            {editing ? (
              <input
                type='text'
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={() => setEditing(false)}
                autoFocus
                style={{
                  fontSize: '24px',
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                }}
              />
            ) : (
              <span
                onClick={() => setEditing(true)}
                style={{ cursor: 'pointer' }}>
                {text}
              </span>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
