const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
        lowercase:true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

module.exports = User