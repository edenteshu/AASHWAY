const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

// To create a new blog post
router.post("/", async (req, res) => {
  const { title, content, author, tags } = req.body;

  // To validate required fields
  if (!title || !content || !author) {
    return res
      .status(400)
      .json({ message: "Title, content, and author are required." });
  }

  //to create the blog post
  const blog = new Blog({
    title,
    content,
    author,
    tags,
  });

  try {
    // To save the blog post to the database
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//to  get all blog posts
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// to get a single blog post by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a blog post by ID
router.put("/:id", async (req, res) => {
  const { title, content, author, tags } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, author, tags },
      { new: true, runValidators: true }
    );

    if (!updatedBlog)
      return res.status(404).json({ message: "Blog not found" });
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// to delete a blog post by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog)
      return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
