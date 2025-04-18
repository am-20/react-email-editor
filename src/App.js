import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { ExportButton } from './components/ExportButton';
import './index.css';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='app-container'>
        <Sidebar />
        <Canvas />
      </div>
      {/* <ExportButton /> */}
    </DndProvider>
  );
}

export default App;
