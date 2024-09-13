const express = require("express");
const Project = require("../models/Project");
const router = express.Router();

// to create a new project
router.post("/", async (req, res) => {
  const { title, description, link, imageUrl, techStack } = req.body;

  // to validate that title and description are present
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required." });
  }

  // to create the project with the provided data
  const project = new Project({
    title,
    description,
    link,
    imageUrl,
    techStack,
  });

  try {
    // tosave the project to the database
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// to get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// to get a single project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// to update a project by ID
router.put("/:id", async (req, res) => {
  const { title, description, link, imageUrl, techStack } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, link, imageUrl, techStack },
      { new: true, runValidators: true }
    );

    if (!updatedProject)
      return res.status(404).json({ message: "Project not found" });
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// to delete a project by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject)
      return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
