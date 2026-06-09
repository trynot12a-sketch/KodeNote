import React from 'react';
import { useSnippets } from '../context/SnippetContext';
import { useAuth } from '../context/AuthContext';
import { Plus, Clock, Hash, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { snippets, loading } = useSnippets();
  const { user } = useAuth();

  const recentSnippets = snippets.slice(0, 5);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold">Welcome back, {user?.username}!</h2>
          <p className="text-dark-muted mt-1">Here's what's happening with your snippets.</p>
        </div>
        <Link
          to="/create"
          className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          Create Snippet
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-card border border-dark-border p-6 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-xl">
              <Code className="text-blue-500" />
            </div>
            <div>
              <p className="text-dark-muted text-sm font-medium">Total Snippets</p>
              <h3 className="text-2xl font-bold">{snippets.length}</h3>
            </div>
          </div>
        </div>
        {/* Add more stats card here if needed */}
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Recently Created
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-dark-card border border-dark-border rounded-2xl" />
              ))}
            </div>
          ) : recentSnippets.length > 0 ? (
            recentSnippets.map(snippet => (
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
                <div className="text-dark-muted text-sm">
                  {new Date(snippet.createdAt).toLocaleDateString()}
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12 bg-dark-card border border-dark-border border-dashed rounded-2xl">
              <p className="text-dark-muted">No snippets found. Start by creating one!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
