import React, { useState, useEffect, useCallback, useContext } from 'react';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import './Editor.css';
import { SocketContext } from '../../SocketContext';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';


// Toolbar options needed in Editor
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ['clean'],
];


// Configuring different languages for editor
hljs.configure({
  languages: [
    'c++',
    'java',
    'javascript',
    'ruby',
    'python',
    'swift',
    'golang',
    'html',
  ],
});


// Setting consts for editor
const Editor = () => {
  const {
    otherUser,
    socketState: socket,
    quill,
    setQuill,
  } = useContext(SocketContext);


  // For handling specific kind of changes and error conditions
  useEffect(() => {
    if (!socket || !quill || !otherUser) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta, otherUser);
    };

    // Text change handler 
    quill.on('text-change', handler);
    return () => {
      quill.off('text-change', handler);
    };
  }, [socket, quill]);

  // Update contents handler
  useEffect(() => {
    if (!socket || !quill) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };

    // Receive changes handler
    socket.on('recieve-changes', handler);
    return () => {
      socket.off('recieve-changes', handler);
    };
  }, [socket, quill]);

  const editorRef = useCallback((editorWrapper) => {
    if (editorWrapper === null) return;

    editorWrapper.innerHTML = '';
    const editor = document.createElement('div');
    editorWrapper.append(editor);

    const q = new Quill(editor, {
      theme: 'snow',
      modules: {
        syntax: {
          highlight: (text) => hljs.highlightAuto(text).value,
        },
        toolbar: toolbarOptions,
      },
    });
    if (quill) q.setContents(quill.getContents());
    setQuill(q);
  }, []);


  // HTML class for editor on left side
  return (
    <>
      <div className='editor slide-left' ref={editorRef}></div>
    </>
  );
};

export default Editor;