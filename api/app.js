const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); 
const app = express();
const port = 3000;

// Configure PostgreSQL connection pool
const pool = new Pool({
  user: 'myuser',
  host: 'postgres',
  database: 'mydatabase',
  password: 'mypassword',
  port: 5432,
});

// Middleware to parse JSON request body
app.use(express.json());
const whitelist = ['http://localhost:5173', 'http://frontend1:8080','http://frontend1:80','http://localhost:8080'];

// Configure CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Enable CORS with the configured options
app.use(cors(corsOptions));
// Route to fetch all rows from the customers table
app.get('/customers', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM customers');
    const customers = result.rows;
    client.release();
    res.json(customers);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server stopped.');
    pool.end(() => {
      console.log('Database pool disconnected.');
      process.exit(0);
    });
  });
});
