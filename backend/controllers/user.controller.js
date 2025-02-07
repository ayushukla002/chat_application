const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs")
const createTokenAndSaveCookie = require("../jwt/generatetoken.js")

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

        // generating jwt token
        if(newUser){
            createTokenAndSaveCookie(newUser._id, res)
            res.status(200).json({ message: "User successfully registered!", newUser });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(404).json({ message: "User not found or password is incorrect" });
        }

        createTokenAndSaveCookie(user._id, res);
        return res.status(200).json({ message: "User logged in successfully", user });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


const logOut = (req, res)=>{
    try {
        res.clearCookie("jwt")
        res.status(200).json({message:"user logged out successfully!"})
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}




module.exports = {signUp, logIn, logOut};
