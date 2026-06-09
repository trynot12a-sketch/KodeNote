const Snippet = require('../models/Snippet')

// @desc    Get all snippets for logged in user
// @route   GET /api/snippets
// @access  Private
const getSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({ createdBy: req.user.id }).sort({ createdAt: -1 })
    res.json(snippets)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc    Get single snippet
// @route   GET /api/snippets/:id
// @access  Private
const getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id)

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' })
    }

    if (snippet.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    res.json(snippet)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc    Create a snippet
// @route   POST /api/snippets
// @access  Private
const createSnippet = async (req, res) => {
  try {
    const { title, language, code, tags } = req.body

    const snippet = await Snippet.create({
      title,
      language,
      code,
      tags: tags || [],
      createdBy: req.user.id
    })

    res.status(201).json(snippet)
  } catch (error) {
    res.status(400).json({ message: 'Invalid snippet data' })
  }
}

// @desc    Update a snippet
// @route   PUT /api/snippets/:id
// @access  Private
const updateSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id)

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' })
    }

    if (snippet.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    const { title, language, code, tags } = req.body

    const updatedSnippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      { title, language, code, tags },
      { new: true }
    )

    res.json(updatedSnippet)
  } catch (error) {
    res.status(400).json({ message: 'Invalid snippet data' })
  }
}

// @desc    Delete a snippet
// @route   DELETE /api/snippets/:id
// @access  Private
const deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id)

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' })
    }

    if (snippet.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    await snippet.deleteOne()

    res.json({ id: req.params.id, message: 'Snippet removed' })
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

module.exports = {
  getSnippets,
  getSnippetById,
  createSnippet,
  updateSnippet,
  deleteSnippet
}
