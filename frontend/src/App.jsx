import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditorRoom from './pages/EditorRoom';
import Dashboard from './pages/Dashboard';
import NamePromptModal from './components/NamePromptModal';
import { useUserName } from './hooks/useUserName';

function App() {
  const { hasName, setName } = useUserName();

  return (
    <BrowserRouter>
      {!hasName && <NamePromptModal onSubmit={setName} />}
      <Routes>
        <Route path="/doc/:roomId" element={<EditorRoom />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App