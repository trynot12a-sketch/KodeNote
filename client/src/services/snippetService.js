import axios from 'axios';

const API_URL = '/api/snippets';

const getSnippets = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getSnippet = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createSnippet = async (snippetData) => {
  const response = await axios.post(API_URL, snippetData);
  return response.data;
};

const updateSnippet = async (id, snippetData) => {
  const response = await axios.put(`${API_URL}/${id}`, snippetData);
  return response.data;
};

const deleteSnippet = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const snippetService = {
  getSnippets,
  getSnippet,
  createSnippet,
  updateSnippet,
  deleteSnippet,
};

export default snippetService;
