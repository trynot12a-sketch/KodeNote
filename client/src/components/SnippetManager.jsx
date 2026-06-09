import React, { useState, useEffect } from 'react';
import { useSnippets } from '../context/SnippetContext';
import { useAuth } from '../context/AuthContext';

const SnippetManager = () => {
  const { snippets, loading, error, getSnippets, createSnippet, deleteSnippet } = useSnippets();
  const { user, logout } = useAuth();
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    getSnippets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createSnippet({ title, code, language });
    if (result.success) {
      setTitle('');
      setCode('');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="snippet-manager">
      <header>
        <h1>KodeNote Snippets</h1>
        <p>Welcome, {user?.username}</p>
        <button onClick={logout}>Logout</button>
      </header>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        <textarea
          placeholder="Code snippet..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Save Snippet</button>
      </form>

      {loading && <p>Loading snippets...</p>}
      {error && <p className="error">{error}</p>}

      <div className="snippets-list">
        {snippets.map(snippet => (
          <div key={snippet._id} className="snippet-item">
            <h3>{snippet.title} ({snippet.language})</h3>
            <pre><code>{snippet.code}</code></pre>
            <button onClick={() => deleteSnippet(snippet._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SnippetManager;
