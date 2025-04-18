import { useState } from 'react';

export default function Disclaimer() {
  const [text, setText] = useState('Your Disclaimer Here');
  const [editing, setEditing] = useState(false);

  return (
    <table
      width='100%'
      cellPadding='0'
      cellSpacing='0'
      style={{ borderCollapse: 'collapse' }}>
      <tbody>
        <tr>
          <td
            align='center'
            style={{ fontSize: '14px', color: '#999999', padding: 0 }}>
            {editing ? (
              <input
                type='text'
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={() => setEditing(false)}
                autoFocus
                style={{
                  fontSize: '14px',
                  color: '#999999',
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
