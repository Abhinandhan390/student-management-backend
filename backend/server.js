const express = require('express');
const connectDB = require('./config/db');

const app = express();

const PORT = 5000;

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('PoCP Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
