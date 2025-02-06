const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs")

const signUp = async (req, res) => {
    try {
        const { full_name, email, password, confirm_password } = req.body;
        if (password !== confirm_password) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // hashing the password
        const encryptPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            full_name,
            email,
            password: encryptPassword
        });
        await newUser.save();
        res.status(200).json({ message: "User successfully registered!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = signUp;
