const express = require('express');
const connectDb = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const isAdmin = require('./middleware/isAdmin');
const app = express();

// Connect to MongoDB
connectDb();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api', bookingRoutes);
app.use('/api/admin', isAdmin, adminRoutes);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

