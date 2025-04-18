import { useDrop } from 'react-dnd';
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ItemTypes } from './ItemTypes';
import ELEMENTS from './ElementRegistry';

import CanvasItem from './CanvasItem';

const Canvas = () => {
  const [items, setItems] = useState([]);

  /* ---------------- DROP zone (root) ---------------- */
  const [, drop] = useDrop({
    accept: ItemTypes.ELEMENT,
    drop: (dragged, monitor) => {
      if (monitor.didDrop()) return; // inner container handled it

      // Moving FROM a container ➜ root
      if ('id' in dragged) {
        if (dragged.parentId !== 'root') {
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

      // From sidebar ➜ root
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
    <div
      ref={drop}
      style={{
        width: 640,
        margin: '0 auto',
        border: '2px dashed #ccc',
        padding: 20,
        background: '#f7f7f7',
      }}>
      {items.map((it, idx) => (
        <CanvasItem
          key={it.id}
          id={it.id}
          index={idx}
          type={it.type}
          parentId='root' // NEW
          backgroundColor={it.backgroundColor}
          moveItem={moveItem}
          updateItem={patchItem}
          onDelete={deleteItem}
        />
      ))}
    </div>
  );
};

export default Canvas;
