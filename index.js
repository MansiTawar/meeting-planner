const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const expenseRoutes = require('./backend/routes/expenses');
const authRoutes = require('./backend/routes/auth'); // adjust the path if needed

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://127.0.0.1:5501',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());

app.use('/api/expenses', expenseRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const expense = expenses.find(exp => exp.id === id);
  
  if (expense) {
    res.json(expense);
  } else {
    res.status(404).json({ error: 'Expense not found' });
  }
});



app.get('/', (req, res) => {
  res.send('Expense Tracker Backend Running...');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
