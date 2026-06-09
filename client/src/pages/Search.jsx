import React, { useState, useEffect } from 'react';
import { useSnippets } from '../context/SnippetContext';
import { Search as SearchIcon, Hash, Code, ExternalLink } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchParams] = useSearchParams();
  const { snippets } = useSnippets();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filterLang, setFilterLang] = useState('all');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, [searchParams]);

  const languages = ['all', ...new Set(snippets.map(s => s.language))];

  const filteredSnippets = snippets.filter(snippet => {
    const matchesQuery =
      snippet.title.toLowerCase().includes(query.toLowerCase()) ||
      (snippet.description && snippet.description.toLowerCase().includes(query.toLowerCase())) ||
      snippet.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));

    const matchesLang = filterLang === 'all' || snippet.language === filterLang;

    return matchesQuery && matchesLang;
  });

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold">Search Snippets</h2>
        <p className="text-dark-muted mt-1">Find exactly what you need.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title or tags..."
            className="w-full bg-dark-card border border-dark-border rounded-xl py-4 pl-12 pr-4 focus:border-primary focus:outline-none transition-colors"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <select
          className="bg-dark-card border border-dark-border rounded-xl py-4 px-6 focus:border-primary focus:outline-none transition-colors capitalize"
          value={filterLang}
          onChange={e => setFilterLang(e.target.value)}
        >
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang === 'all' ? 'All Languages' : lang}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredSnippets.length > 0 ? (
          filteredSnippets.map(snippet => (
            <Link
              key={snippet._id}
              to={`/snippet/${snippet._id}`}
              className="bg-dark-card border border-dark-border p-6 rounded-2xl hover:border-primary/50 transition-all group flex justify-between items-center"
            >
              <div>
                <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{snippet.title}</h4>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs bg-dark-border px-2 py-1 rounded text-dark-muted uppercase font-bold tracking-wider">
                    {snippet.language}
                  </span>
                  <div className="flex items-center gap-1 text-dark-muted text-sm">
                    <Hash className="w-3 h-3" />
                    <span>{snippet.tags.join(', ')}</span>
                  </div>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-dark-muted group-hover:text-primary transition-colors" />
            </Link>
          ))
        ) : (
          <div className="text-center py-20 bg-dark-card border border-dark-border border-dashed rounded-2xl">
            <p className="text-dark-muted">No snippets match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
