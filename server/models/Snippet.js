const mongoose = require('mongoose')

const snippetSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true
    },
    code: {
      type: String,
      required: [true, 'Please add code content']
    },
    language: {
      type: String,
      required: [true, 'Please add a programming language'],
      trim: true
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Snippet', snippetSchema)
