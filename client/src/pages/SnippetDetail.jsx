import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSnippets } from '../context/SnippetContext';
import { ArrowLeft, Edit2, Trash2, Calendar, Code, Hash, Copy, Check } from 'lucide-react';

const SnippetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { snippets, deleteSnippet } = useSnippets();
  const [copied, setCopied] = useState(false);

  const snippet = snippets.find(s => s._id === id);

  if (!snippet) return <div className="p-8 text-center text-dark-muted">Snippet not found.</div>;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      await deleteSnippet(id);
      navigate('/');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-dark-card rounded-xl text-dark-muted transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-3xl font-bold">{snippet.title}</h2>
            <div className="flex items-center gap-4 mt-1 text-dark-muted text-sm">
              <span className="flex items-center gap-1">
                <Code className="w-4 h-4" />
                <span className="uppercase font-bold tracking-wider">{snippet.language}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(snippet.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/edit/${snippet._id}`}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-dark-card border border-dark-border rounded-xl hover:border-primary transition-colors font-medium"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-dark-card border border-dark-border rounded-xl hover:border-red-500 hover:text-red-500 transition-colors font-medium text-dark-muted"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </header>

      <div className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden relative">
        <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border bg-dark-bg/50">
          <span className="text-xs font-bold text-dark-muted uppercase tracking-widest">{snippet.language} source</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-xs font-bold text-dark-muted hover:text-primary transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
        <pre className="p-8 overflow-x-auto text-sm font-mono leading-relaxed">
          <code>{snippet.code}</code>
        </pre>
      </div>

      <div className="flex flex-wrap gap-2">
        {snippet.tags.map(tag => (
          <span key={tag} className="flex items-center gap-1 px-4 py-2 bg-dark-card border border-dark-border rounded-full text-sm text-dark-muted font-medium">
            <Hash className="w-3 h-3 text-primary" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SnippetDetail;
