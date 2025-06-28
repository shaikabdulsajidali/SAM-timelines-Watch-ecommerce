// routes/productRoutes.js
const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Add product
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file?.path;

    const product = new Product({ name, description, price, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product', details: err });
  }
});

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Update product
router.put('/:id', upload.single('image'), async (req, res) => {
  const { name, description, price } = req.body;
  const updateData = { name, description, price };
  if (req.file) updateData.image = req.file.path;

  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update product' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
