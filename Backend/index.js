const express = require('express');
const {dbConnection} = require("./database/config");
require('dotenv').config();
const cors = require('cors');

// Creating express server
const app = express();

// Data Base
dbConnection();

// CORS
app.use(cors())

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