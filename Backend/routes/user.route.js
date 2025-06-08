const express = require('express');
const { userModel } = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const CryptoJS = require('crypto-js');



const userRoute = express.Router();


const SECRET_KEY = 'my-secret-key';


function decryptString(encryptedText) {
  const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

userRoute.post('/Signup', async (req, res) => {

    const { email, password, role, age } = JSON.parse(decryptString(req.body.data));

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ success: false, message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the user
        const newUser = new userModel({
            email,
            password: hashedPassword,
            role,
            age:+age
        });

        await newUser.save();

        // Generate token
        const token = jwt.sign(
            { email: newUser.email, role: newUser.role },
            process.env.secretKey,
            { expiresIn: "1h" }
        );

        return res.status(201).send({
            success: true,
            user: { email: newUser.email, role: newUser.role },
            token,
            message: "User registered successfully"
        });

    } catch (err) {
        return res.status(500).send({ success: false, message: err.message });
    }
});


userRoute.post('/login', async(req, res) => {
    const { email, password } = JSON.parse(decryptString(req.body.data));
    try {
        // lets find weather user exist or not
        const user = await userModel.findOne({ email})
        
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(403).send("Incorrect password.");
            }
            
            const token = jwt.sign({ email: user.email }, process.env.secretKey,{ expiresIn: "1h" });
            return res.status(200).send({
                success: true,
                user: { email: user.email, role: user.role },
                token: token,
                message: "User Verified Successfully"
            })
        }
        return res.status(403).send("invalid user please sign up")
    } catch (err) {
        return res.status(501).send({success:false,message:err.message})
    }
})



module.exports = { userRoute };