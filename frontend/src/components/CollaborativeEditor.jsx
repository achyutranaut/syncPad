import { useRef, useEffect } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView, basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { yCollab } from 'y-codemirror.next'
import { getColorPairForClientId } from '../lib/color'
import { useUserNameContext } from '../context/UserNameContext'

function CollaborativeEditor({ ydoc, provider }) {
  const containerRef = useRef(null);
  const viewRef = useRef(null);
  const { name } = useUserNameContext();

  useEffect(() => {
    if (!ydoc || !provider) return;

    const ytext = ydoc.getText('shared-text');

    const { color, colorLight } = getColorPairForClientId(provider.awareness.clientID);
    provider.awareness.setLocalStateField('user', {
      name: name || 'User' + (provider.awareness.clientID % 1000),
      color,
      colorLight,
    });

    const baseTheme = EditorView.theme({
      '&': { height: '100%' },
      '.cm-scroller': { fontFamily: 'inherit', padding: '8px 0' },
      '.cm-content': { padding: '0 12px' },
    });

    const state = EditorState.create({
      doc: ytext.toString(),
      extensions: [
        basicSetup,
        javascript(),
        baseTheme,
        yCollab(ytext, provider.awareness),
      ],
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, [ydoc, provider, name]);

  return <div ref={containerRef} className="h-full text-left" />;
}

export default CollaborativeEditor