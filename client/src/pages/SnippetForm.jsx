import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnippets } from '../context/SnippetContext';
import { Save, ArrowLeft, Tags, Code } from 'lucide-react';

const SnippetForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { snippets, createSnippet, updateSnippet } = useSnippets();

  const [formData, setFormData] = useState({
    title: '',
    language: 'javascript',
    code: '',
    tags: ''
  });

  useEffect(() => {
    if (id) {
      const snippet = snippets.find(s => s._id === id);
      if (snippet) {
        setFormData({
          title: snippet.title,
          language: snippet.language,
          code: snippet.code,
          tags: snippet.tags.join(', ')
        });
      }
    }
  }, [id, snippets]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };

    try {
      if (id) {
        await updateSnippet(id, data);
      } else {
        await createSnippet(data);
      }
      navigate('/');
    } catch (err) {
      console.error('Error saving snippet:', err);
    }
  };

  const languages = ['javascript', 'python', 'html', 'css', 'typescript', 'java', 'cpp', 'rust', 'go', 'php'];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-dark-card rounded-xl text-dark-muted transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold">{id ? 'Edit Snippet' : 'New Snippet'}</h2>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-dark-card border border-dark-border p-8 rounded-3xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-dark-muted flex items-center gap-2">
                Title
              </label>
              <input
                type="text"
                className="w-full bg-dark-bg border border-dark-border rounded-xl py-3 px-4 focus:border-primary focus:outline-none transition-colors"
                placeholder="Ex: API Fetch Helper"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-dark-muted flex items-center gap-2">
                Language
              </label>
              <select
                className="w-full bg-dark-bg border border-dark-border rounded-xl py-3 px-4 focus:border-primary focus:outline-none transition-colors capitalize"
                value={formData.language}
                onChange={e => setFormData({...formData, language: e.target.value})}
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-dark-muted flex items-center gap-2">
              <Code className="w-4 h-4" />
              Code Content
            </label>
            <textarea
              className="w-full bg-dark-bg border border-dark-border rounded-xl py-4 px-4 h-64 font-mono text-sm focus:border-primary focus:outline-none transition-colors resize-none"
              placeholder="Paste your code here..."
              value={formData.code}
              onChange={e => setFormData({...formData, code: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-dark-muted flex items-center gap-2">
              <Tags className="w-4 h-4" />
              Tags (comma separated)
            </label>
            <input
              type="text"
              className="w-full bg-dark-bg border border-dark-border rounded-xl py-3 px-4 focus:border-primary focus:outline-none transition-colors"
              placeholder="Ex: react, api, helper"
              value={formData.tags}
              onChange={e => setFormData({...formData, tags: e.target.value})}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
        >
          <Save className="w-5 h-5" />
          {id ? 'Update Snippet' : 'Save Snippet'}
        </button>
      </form>
    </div>
  );
};

export default SnippetForm;
