import { useRef, memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import ELEMENTS from './ElementRegistry';

const Unknown = () => <div style={{ color: 'red' }}>Unknown element</div>;

const CanvasItem = ({
  id,
  index,
  type,
  parentId = 'root', // NEW
  backgroundColor,
  moveItem,
  updateItem,
  onDelete,
}) => {
  const ref = useRef(null);

  /* ---------------- DRAG ---------------- */
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ELEMENT,
    item: {
      id,
      type,
      parentId,
      backgroundColor,
      removeSelf: () => onDelete(id), // NEW
    },
    collect: (m) => ({ isDragging: m.isDragging() }),
  });

  /* -------------- DROP (re‑order) -------------- */
  const [, drop] = useDrop({
    accept: ItemTypes.ELEMENT,
    hover: (dragItem) => {
      if (!ref.current || dragItem.id === id) return;
      if (dragItem.parentId !== parentId) return; // only reorder within same parent
      moveItem(dragItem.id, index);
      dragItem.index = index;
    },
  });

  drag(drop(ref));

  const Element = ELEMENTS[type] || Unknown;

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        marginBottom: 10,
        padding: 10,
        border: '1px solid #d5d5d5',
        background: backgroundColor,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}>
      {/* --- mini toolbar --- */}
      <div
        style={{
          position: 'absolute',
          top: 6,
          right: 6,
          display: 'flex',
          gap: 6,
        }}>
        <input
          type='color'
          value={backgroundColor}
          onChange={(e) => updateItem(id, { backgroundColor: e.target.value })}
          style={{ width: 22, height: 22, border: 'none' }}
        />
        <button
          onClick={() => onDelete(id)}
          style={{
            border: 'none',
            background: 'transparent',
            fontSize: 18,
            cursor: 'pointer',
          }}>
          ×
        </button>
      </div>

      <Element />
    </div>
  );
};

export default memo(CanvasItem);
