import React, { createContext, useState, useContext } from 'react'

const SnippetContext = createContext()

export const SnippetProvider = ({ children }) => {
  const [snippets, setSnippets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch all snippets
  const getSnippets = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/snippets', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (response.ok) {
        setSnippets(data)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Create a snippet
  const createSnippet = async (snippetData) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/snippets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(snippetData)
      })
      const data = await response.json()
      if (response.ok) {
        setSnippets([...snippets, data])
        return { success: true }
      } else {
        return { success: false, message: data.message }
      }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  // Update a snippet
  const updateSnippet = async (id, snippetData) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/snippets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(snippetData)
      })
      const data = await response.json()
      if (response.ok) {
        setSnippets(snippets.map(s => (s._id === id ? data : s)))
        return { success: true }
      } else {
        return { success: false, message: data.message }
      }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  // Delete a snippet
  const deleteSnippet = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/snippets/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        setSnippets(snippets.filter(s => s._id !== id))
        return { success: true }
      } else {
        const data = await response.json()
        return { success: false, message: data.message }
      }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  return (
    <SnippetContext.Provider
      value={{
        snippets,
        loading,
        error,
        getSnippets,
        createSnippet,
        updateSnippet,
        deleteSnippet
      }}
    >
      {children}
    </SnippetContext.Provider>
  )
}

export const useSnippets = () => {
  const context = useContext(SnippetContext)
  if (!context) {
    throw new Error('useSnippets must be used within a SnippetProvider')
  }
  return context
}
