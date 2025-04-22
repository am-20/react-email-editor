import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

const SelectedItemContext = createContext(null);

/**
 * Provider sitting near the root.
 * Holds selectedId + convenience helpers.
 */
export const SelectedItemProvider = ({ children }) => {
  const [selectedId, setSelectedId] = useState(null);

  /* ESC clears the selection */
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setSelectedId(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const value = {
    selectedId,
    setSelectedId,
    clear: () => setSelectedId(null),
    isSelected: (id) => id === selectedId,
  };

  return (
    <SelectedItemContext.Provider value={value}>
      {children}
    </SelectedItemContext.Provider>
  );
};

export const useSelectedItem = () => useContext(SelectedItemContext);
