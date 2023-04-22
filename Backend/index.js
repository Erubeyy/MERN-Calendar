const express = require('express');
require('dotenv').config();

// Creating express server
const app = express();

// Public directory
app.use( express.static('public') )

// Lecture and parsing of body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Listen to petitions
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo PORT: ${process.env.PORT} `);
});