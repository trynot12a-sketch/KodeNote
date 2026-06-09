const mongoose = require('mongoose')

const snippetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: [true, 'Please add a title']
    },
    code: {
      type: String,
      required: [true, 'Please add code']
    },
    language: {
      type: String,
      required: [true, 'Please add a language']
    },
    description: {
      type: String
    },
    tags: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Snippet', snippetSchema)
