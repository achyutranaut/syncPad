import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditorRoom from './pages/EditorRoom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/doc/:roomId" element={<EditorRoom />} />
        <Route path="/" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App