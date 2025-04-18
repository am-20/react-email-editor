import { useRef, memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import ELEMENT_REGISTRY from './ElementRegistry';

/* fallback so React never crashes even if a type is missing */
const UnknownElement = () => (
  <div style={{ color: 'red', fontStyle: 'italic' }}>Unknown element type</div>
);

const CanvasItem = ({
  id,
  index,
  type,
  backgroundColor,
  moveItem,
  updateItem,
  onDelete,
}) => {
  const ref = useRef(null);

  /* drag ---------------------------------------------------------------- */
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ELEMENT,
    item: { id, index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  /* drop (for re‑ordering) --------------------------------------------- */
  const [, drop] = useDrop({
    accept: ItemTypes.ELEMENT,
    hover: (dragItem) => {
      if (!ref.current || dragItem.id === id) return;
      moveItem(dragItem.id, index);
      dragItem.index = index;
    },
  });

  drag(drop(ref));

  /* resolve the real element on every render */
  const Element = ELEMENT_REGISTRY[type] || UnknownElement;

  /* render -------------------------------------------------------------- */
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
      {/* mini‑toolbar */}
      <div
        style={{
          position: 'absolute',
          top: 6,
          right: 6,
          display: 'flex',
          gap: 6,
          alignItems: 'center',
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
            lineHeight: 1,
            cursor: 'pointer',
          }}>
          ×
        </button>
      </div>

      <Element />
    </div>
  );
};

/* memo avoids unnecessary re‑renders during drag‑over churn */
export default memo(CanvasItem);
