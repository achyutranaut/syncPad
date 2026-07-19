import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { useEffect, useState } from 'react';
import { useOwnerId } from './useOwnerId';

function useYjsDoc(roomName) {
  const [ydoc] = useState(() => new Y.Doc());
  const [provider, setProvider] = useState(null);
  const [status, setStatus] = useState('connecting');
  const ownerId = useOwnerId();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/docs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ docName: roomName, ownerId }),
    }).catch((err) => console.error('Failed to register room ownership:', err));

    const wsProvider = new WebsocketProvider(import.meta.env.VITE_WS_URL, roomName, ydoc);

    const handleStatus = (event) => setStatus(event.status);
    wsProvider.on('status', handleStatus);

    setProvider(wsProvider);

    return () => {
      wsProvider.off('status', handleStatus);
      wsProvider.destroy();
      setProvider(null);
    };
  }, [roomName, ydoc, ownerId]);

  return { ydoc, provider, status };
}

export default useYjsDoc