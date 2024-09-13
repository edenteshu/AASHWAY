const mongoose = require("mongoose");

// blog schema with validation rules
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Content is required."],
  },
  author: {
    type: String,
    required: [true, "Author is required."],
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Blog", blogSchema);
