import { useDrop } from 'react-dnd';
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ItemTypes } from './ItemTypes';
import Headline from './Elements/Headline';
import Title from './Elements/Title';
import Text from './Elements/Text';
import Disclaimer from './Elements/Disclaimer';
import ImageItem from './Elements/ImageItem';
import TwoColumnImages from './Elements/TwoColumnImages';
import ButtonItem from './Elements/ButtonItem';
import SpacerItem from './Elements/SpacerItem';
import { CanvasItem } from './CanvasItem';

const COMPONENT_MAP = {
  headline: Headline,
  title: Title,
  text: Text,
  disclaimer: Disclaimer,
  image: ImageItem,
  button: ButtonItem,
  spacer: SpacerItem,
  'two-column': TwoColumnImages,
};

export const Canvas = () => {
  const [items, setItems] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ELEMENT,
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        setItems((prevItems) => [
          ...prevItems,
          { id: uuidv4(), type: item.type },
        ]);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const moveItem = useCallback((fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    setItems((prevItems) => {
      const updated = [...prevItems];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }, []);

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
      <div
        ref={drop}
        style={{
          width: '640px',
          border: '2px dashed #ccc',
          background: isOver ? '#f4f4f4' : '#fff',
          padding: '40px 80px',
        }}>
        <table
          width='100%'
          cellPadding='0'
          cellSpacing='0'
          style={{
            borderCollapse: 'collapse',
            width: '100%',
          }}
          id='export-canvas'>
          <tbody>
            {items.map((item, index) => {
              const Component = COMPONENT_MAP[item.type];
              return (
                <tr key={item.id}>
                  <td style={{ padding: 0 }}>
                    <div style={{ position: 'relative' }}>
                      {/* Delete button (editor-only) */}
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{
                          position: 'absolute',
                          top: '5px',
                          right: '5px',
                          background: 'red',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          zIndex: 10,
                        }}
                        title='Delete'>
                        ×
                      </button>
                      <CanvasItem
                        key={item.id}
                        id={item.id}
                        index={index}
                        type={item.type}
                        moveItem={moveItem}
                        onDelete={handleDelete}
                        Component={Component}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
