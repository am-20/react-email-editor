import { useDrop } from 'react-dnd';
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ItemTypes } from './ItemTypes';
// import ELEMENT_REGISTRY from './ElementRegistry';

import CanvasItem from './CanvasItem';

const Canvas = () => {
  const [items, setItems] = useState([]);

  /* drop new elements from the sidebar */
  const [, drop] = useDrop({
    accept: ItemTypes.ELEMENT,
    drop: (draggedItem) => {
      if ('id' in draggedItem) return;

      const { type } = draggedItem;
      if (!type) return; // safety

      setItems((prev) => [
        ...prev,
        { id: uuidv4(), type, backgroundColor: '#ffffff' },
      ]);
    },
  });

  /* reorder ------------------------------------------------------------- */
  const moveItem = useCallback((dragId, hoverIndex) => {
    setItems((prev) => {
      const fromIndex = prev.findIndex((it) => it.id === dragId);
      if (fromIndex === -1 || hoverIndex < 0 || hoverIndex >= prev.length)
        return prev;

      const next = [...prev];
      const [removed] = next.splice(fromIndex, 1);
      next.splice(hoverIndex, 0, removed);
      return next;
    });
  }, []);

  /* small helpers */
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

  /* render -------------------------------------------------------------- */
  return (
    <div
      ref={drop}
      style={{
        width: 640,
        minHeight: 400,
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
