import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditorRoom from './pages/EditorRoom';
import Dashboard from './pages/Dashboard';
import NamePromptModal from './components/NamePromptModal';
import { UserNameProvider, useUserNameContext } from './context/UserNameContext';

function AppRoutes() {
  const { hasName, setName } = useUserNameContext();

  return (
    <>
      {!hasName && <NamePromptModal onSubmit={setName} />}
      <Routes>
        <Route path="/doc/:roomId" element={<EditorRoom />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <UserNameProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserNameProvider>
  );
}

export default App