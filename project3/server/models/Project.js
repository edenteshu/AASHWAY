const mongoose = require("mongoose");

// e project schema with validation
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required."],
    trim: true,
  },
  link: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  techStack: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Project", projectSchema);
