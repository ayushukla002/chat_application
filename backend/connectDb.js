const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            
        });
        console.log("Database connected!");
    } catch (error) {
        console.error("Failed to connect to database:", error);
    }
};

module.exports = connectDb;
