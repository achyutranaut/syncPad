import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { useEffect, useState } from 'react';

function useYjsDoc(roomName) {
  const [ydoc] = useState(() => new Y.Doc());
  const [provider, setProvider] = useState(null);
  const [status, setStatus] = useState('connecting');

  useEffect(() => {
    const wsProvider = new WebsocketProvider('ws://localhost:4000', roomName, ydoc);

    const handleStatus = (event) => setStatus(event.status);
    wsProvider.on('status', handleStatus);

    setProvider(wsProvider);

    return () => {
      wsProvider.off('status', handleStatus);
      wsProvider.destroy();
      setProvider(null);
    };
  }, [roomName, ydoc]);

  return { ydoc, provider, status };
}

export default useYjsDoc