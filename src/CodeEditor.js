import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import './App.css'; // Ensure you have CSS for styling

const CodeEditor = () => {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');

  const iframeRef = useRef(null);

  // Function to update the iframe content dynamically
  const updateIframe = () => {
    const document = iframeRef.current.contentDocument;
    const documentContents = `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
    `;
    document.open();
    document.write(documentContents);
    document.close();
  };

  useEffect(() => {
    // Fetch the default HTML, CSS, and JS files from the public folder
    fetch('/default.html')
      .then((response) => response.text())
      .then((html) => setHtmlCode(html))
      .catch((error) => console.error('Error loading HTML:', error));

    fetch('/default.css')
      .then((response) => response.text())
      .then((css) => setCssCode(css))
      .catch((error) => console.error('Error loading CSS:', error));

    fetch('/default.js')
      .then((response) => response.text())
      .then((js) => setJsCode(js))
      .catch((error) => console.error('Error loading JS:', error));
  }, []);

  useEffect(() => {
    updateIframe(); // Update the iframe whenever the code changes
  }, [htmlCode, cssCode, jsCode]);

  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <h1>&lt;/&gt; Code Editor</h1>
      </header>

      <div className="editor-container">
        {/* HTML Editor */}
        <Editor
          className="editor"
          height="100%"
          defaultLanguage="html"
          value={htmlCode}
          theme="vs-dark"
          onChange={(value) => setHtmlCode(value)}
        />

        {/* CSS Editor */}
        <Editor
          className="editor"
          height="100%"
          defaultLanguage="css"
          value={cssCode}
          theme="vs-dark"
          onChange={(value) => setCssCode(value)}
        />

        {/* JS Editor */}
        <Editor
          className="editor"
          height="100%"
          defaultLanguage="javascript"
          value={jsCode}
          theme="vs-dark"
          onChange={(value) => setJsCode(value)}
        />
      </div>

      {/* Result Window */}
      <iframe
        ref={iframeRef}
        title="Live Preview"
        style={{ width: '100%', height: '50vh', border: 'none', backgroundColor: '#fff' }}
      />
    </div>
  );
};

export default CodeEditor
