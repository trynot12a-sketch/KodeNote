import React, { createContext, useState, useContext, useEffect } from 'react';
import snippetService from '../services/snippetService';
import { useAuth } from './AuthContext';

const SnippetContext = createContext();

export const SnippetProvider = ({ children }) => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const { isAuthenticated } = useAuth();

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchSnippets = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const data = await snippetService.getSnippets();
      setSnippets(data);
    } catch (error) {
      console.error('Error fetching snippets:', error);
      showNotification('Failed to fetch snippets', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, [isAuthenticated]);

  const createSnippet = async (snippetData) => {
    try {
      const data = await snippetService.createSnippet(snippetData);
      setSnippets([data, ...snippets]);
      showNotification('Snippet created successfully!');
      return data;
    } catch (error) {
      showNotification('Failed to create snippet', 'error');
      throw error;
    }
  };

  const updateSnippet = async (id, snippetData) => {
    try {
      const data = await snippetService.updateSnippet(id, snippetData);
      setSnippets(snippets.map(s => s._id === id ? data : s));
      showNotification('Snippet updated successfully!');
      return data;
    } catch (error) {
      showNotification('Failed to update snippet', 'error');
      throw error;
    }
  };

  const deleteSnippet = async (id) => {
    try {
      await snippetService.deleteSnippet(id);
      setSnippets(snippets.filter(s => s._id !== id));
      showNotification('Snippet deleted successfully!');
    } catch (error) {
      showNotification('Failed to delete snippet', 'error');
      throw error;
    }
  };

  return (
    <SnippetContext.Provider value={{ snippets, loading, notification, setNotification, fetchSnippets, createSnippet, updateSnippet, deleteSnippet }}>
      {children}
    </SnippetContext.Provider>
  );
};

export const useSnippets = () => useContext(SnippetContext);
