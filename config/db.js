const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
    }
};

module.exports = connectDb;
