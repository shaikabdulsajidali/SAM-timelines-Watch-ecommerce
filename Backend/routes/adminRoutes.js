const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const Admin = require('../models/Admin');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Admin Signup
router.post('/signup', upload.single('image'), async (req, res) => {
  const { name, email, password } = req.body;
  const image = req.file?.path;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, password: hashedPassword, image });
    await admin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Admin creation failed', details: err });
  }
});

// Admin Login (optional)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id }, 'secret', { expiresIn: '1d' });
    res.json({ token, admin: { _id: admin._id, name: admin.name, email: admin.email, image: admin.image } });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

// View all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
});

module.exports = router;
