import { useState, useCallback, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import { ItemTypes } from '../ItemTypes';
import CanvasItem from '../CanvasItem';

export default function RoundContainer() {
  /* unique id so children know their parent */
  const containerId = useRef(uuidv4()).current;

  /* children ------------------------------------------------------- */
  const [items, setItems] = useState([]);

  /* style ---------------------------------------------------------- */
  const [bg, setBg] = useState('#ffffff');
  const [rad, setRad] = useState(24);
  const [w, setW] = useState(570);
  const [bWid, setBWid] = useState(3);
  const [bCol, setBCol] = useState('#ffffff');
  const [bType, setBType] = useState('solid');

  /* ---------------- DROP zone (inner) ---------------- */
  const [, drop] = useDrop({
    accept: ItemTypes.ELEMENT,
    drop: (dragged, monitor) => {
      if (monitor.didDrop()) return; // sub‑container handled

      // Moving FROM another parent ➜ this container
      if ('id' in dragged) {
        if (dragged.parentId !== containerId) {
          dragged.removeSelf();
          setItems((prev) => [
            ...prev,
            {
              id: dragged.id,
              type: dragged.type,
              backgroundColor: dragged.backgroundColor,
            },
          ]);
        }
        return;
      }

      // From sidebar ➜ this container
      setItems((prev) => [
        ...prev,
        {
          id: uuidv4(),
          type: dragged.type,
          backgroundColor: '#ffffff',
        },
      ]);
    },
  });

  /* ---------------- helpers ---------------- */
  const moveItem = useCallback((dragId, hoverIdx) => {
    setItems((prev) => {
      const fromIdx = prev.findIndex((it) => it.id === dragId);
      if (fromIdx === -1 || hoverIdx < 0 || hoverIdx >= prev.length)
        return prev;
      const next = [...prev];
      const [removed] = next.splice(fromIdx, 1);
      next.splice(hoverIdx, 0, removed);
      return next;
    });
  }, []);

  const patchItem = useCallback(
    (id, patch) =>
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, ...patch } : it))
      ),
    []
  );
  const deleteItem = useCallback(
    (id) => setItems((prev) => prev.filter((it) => it.id !== id)),
    []
  );

  /* ---------------- render ---------------- */
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        ref={drop}
        style={{
          width: w,
          margin: '0 auto',
          borderRadius: rad,
          border: `${bWid}px ${bType} ${bCol}`,
          background: bg,
          padding: 16,
        }}>
        {items.map((it, idx) => (
          <CanvasItem
            key={it.id}
            id={it.id}
            index={idx}
            type={it.type}
            parentId={containerId} // NEW
            backgroundColor={it.backgroundColor}
            moveItem={moveItem}
            updateItem={patchItem}
            onDelete={deleteItem}
          />
        ))}

        {items.length === 0 && (
          <div style={{ fontSize: 12, color: '#888' }}>Drop elements here…</div>
        )}
      </div>

      {/* style controls */}
      <div
        style={{
          marginTop: 12,
          fontSize: 12,
          borderTop: '1px solid #eee',
          paddingTop: 8,
        }}>
        <label style={{ marginRight: 12 }}>
          Background&nbsp;
          <input
            type='color'
            value={bg}
            onChange={(e) => setBg(e.target.value)}
          />
        </label>
        <label style={{ marginRight: 12 }}>
          Radius&nbsp;
          <input
            type='number'
            value={rad}
            onChange={(e) => setRad(+e.target.value || 0)}
            style={{ width: 60 }}
          />
           px
        </label>
        <label style={{ marginRight: 12 }}>
          Width&nbsp;
          <input
            type='number'
            value={w}
            onChange={(e) => setW(+e.target.value || 0)}
            style={{ width: 80 }}
          />
           px
        </label>
        <label style={{ marginRight: 4 }}>
          Border&nbsp;
          <input
            type='number'
            value={bWid}
            onChange={(e) => setBWid(+e.target.value || 0)}
            style={{ width: 50 }}
          />
           px
        </label>
        <input
          type='color'
          value={bCol}
          onChange={(e) => setBCol(e.target.value)}
        />
        <label style={{ marginLeft: 16 }}>
          Border Type&nbsp;
          <select value={bType} onChange={(e) => setBType(e.target.value)}>
            <option value='solid'>Solid</option>
            <option value='dashed'>Dashed</option>
            <option value='dotted'>Dotted</option>
          </select>
        </label>
      </div>
    </div>
  );
}
