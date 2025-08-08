const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db');


router.post('/signup', async (req, res) => {
  try {
    console.log('Signup request body:', req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    db.query(query, [username, email, hashedPassword], (err, results) => {
      if (err) {
        console.error('DB Error:', err.sqlMessage || err); // log full SQL error
        return res.status(500).json({ message: 'Database error' });
      }


      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', userId: user.id });
  });
});

module.exports = router;
