const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const connection = await mongoose.connect("mongodb+srv://kunalbhatiaofficial:sq1dGZhBixRndBBh@getaway.i0gz6zw.mongodb.net/");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
    }
};

module.exports = connectDb;

//sq1dGZhBixRndBBh