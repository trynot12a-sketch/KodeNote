const Snippet = require('../models/Snippet')

// @desc    Get all snippets
// @route   GET /api/snippets
// @access  Private
const getSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({ user: req.user.id })
    res.json(snippets)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Create new snippet
// @route   POST /api/snippets
// @access  Private
const createSnippet = async (req, res) => {
  try {
    const { title, code, language, description, tags } = req.body

    if (!title || !code || !language) {
      return res.status(400).json({ message: 'Please add all required fields' })
    }

    const snippet = await Snippet.create({
      user: req.user.id,
      title,
      code,
      language,
      description,
      tags
    })

    res.status(201).json(snippet)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get snippet by ID
// @route   GET /api/snippets/:id
// @access  Private
const getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id)

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' })
    }

    // Check for user
    if (snippet.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' })
    }

    res.json(snippet)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Update snippet
// @route   PUT /api/snippets/:id
// @access  Private
const updateSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id)

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' })
    }

    // Check for user
    if (snippet.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' })
    }

    const { title, code, language, description, tags } = req.body

    const updatedSnippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      { title, code, language, description, tags },
      { new: true }
    )

    res.json(updatedSnippet)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Delete snippet
// @route   DELETE /api/snippets/:id
// @access  Private
const deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id)

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' })
    }

    // Check for user
    if (snippet.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' })
    }

    await snippet.deleteOne()

    res.json({ id: req.params.id })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getSnippets,
  createSnippet,
  getSnippetById,
  updateSnippet,
  deleteSnippet
}
