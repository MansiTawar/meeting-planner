const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { user_id, category, amount, comments } = req.body;
  if (!user_id || !category || !amount) {
    return res.status(400).json({ error: 'Required fields missing' });
  }

  const sql = 'INSERT INTO expenses (user_id, category, amount, comments) VALUES (?, ?, ?, ?)';
  db.query(sql, [user_id, category, amount, comments], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Expense added', id: result.insertId });
  });
});

router.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  db.query('SELECT * FROM expenses WHERE user_id = ?', [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM expenses', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows); // ✅ sends just the array
  });
});



router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM expenses WHERE id = ?', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ error: 'Expense not found' });
    res.json(rows[0]);
  });
});

router.put('/:id', (req, res) => {
  const { category, amount, comments } = req.body;
  const expenseId = req.params.id;

  const sql = 'UPDATE expenses SET category = ?, amount = ?, comments = ?, updated_at = NOW() WHERE id = ?';
  db.query(sql, [category, amount, comments, expenseId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense updated' });
  });
});

router.delete('/:id', (req, res) => {
  const expenseId = req.params.id;
  db.query('DELETE FROM expenses WHERE id = ?', [expenseId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  });
});

module.exports = router;

backend/routes/expenses.js
