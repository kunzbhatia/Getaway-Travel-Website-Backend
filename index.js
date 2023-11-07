require('dotenv').config();
const express = require('express');
const connectDb = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const isAdmin = require('./middleware/isAdmin');
const app = express();
const cors = require('cors');


// Connect to MongoDB
connectDb();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api', bookingRoutes);
app.use('/api/admin', isAdmin, adminRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to Getaway by Saniya and Kunal');
  });
  

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

