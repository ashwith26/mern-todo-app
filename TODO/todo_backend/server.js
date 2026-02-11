require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

const app = express();

app.use(cors());
app.use(express.json());

/* ================= MongoDB Connection ================= */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

/* ================= Server Start ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port: ${PORT}`);
});

/* ================= Routes ================= */

app.post('/add', async (req, res) => {
  try {
    const { task } = req.body;
    const result = await TodoModel.create({ task });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/get', async (req, res) => {
  try {
    const result = await TodoModel.find();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TodoModel.findByIdAndUpdate(
      id,
      { done: true },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    const result = await TodoModel.findByIdAndUpdate(
      id,
      { task },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TodoModel.findByIdAndDelete(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

