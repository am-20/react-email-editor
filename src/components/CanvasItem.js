import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { useRef } from 'react';

export const CanvasItem = ({
  id,
  index,
  type,
  moveItem,
  onDelete,
  Component,
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.ELEMENT,
    hover(item) {
      if (!ref.current) return;
      if (item.index === index) return;

      moveItem(item.index, index);
      item.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ELEMENT,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: '1px dashed #ccc',
        marginBottom: '10px',
        padding: '10px',
        background: '#fff',
        position: 'relative',
        cursor: 'move',
      }}>
      <Component />
    </div>
  );
};
