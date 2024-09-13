const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

// Submit a contact form
router.post("/", async (req, res) => {
  const contact = new Contact(req.body);
  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
