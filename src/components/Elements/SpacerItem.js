import { useState } from 'react';

export default function SpacerItem() {
  const [height, setHeight] = useState(40);
  const [color, setColor] = useState('#ffffff');

  return (
    <table width='100%' cellPadding='0' cellSpacing='0'>
      <tbody>
        <tr>
          <td
            style={{
              backgroundColor: color,
              height: `${height}px`,
              lineHeight: '1px',
            }}>
            {/* Editor-only controls */}
            <div style={{ fontSize: '12px', padding: '4px' }}>
              Height:
              <input
                type='number'
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value, 10) || 0)}
                style={{ width: '50px', marginLeft: '4px' }}
              />
              &nbsp;Color:
              <input
                type='color'
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ marginLeft: '4px' }}
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
