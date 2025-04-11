import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { createUser, findUserByEmail } from "../models/userModel.js";

dotenv.config();

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log("Registered user: ", {name, email});

   try {
        const existing = await findUserByEmail(email);
        if(existing.length > 0){
            console.log("user already exist with email: ", email);
            return res.status(400).json({error: "user already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(name, email, hashedPassword);

        console.log("user registered sucessfully: ", {name, email});
        res.status(201).json({message: "User registered successfully"});
    } catch (error) {
        console.log("Registration failed: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt for email: ", email);

   try{
    const users = await findUserByEmail(email);
   

    if(!users || users.length === 0) {
        console.log("user not found for email: ", email);
        return res.status(404).json({ error: "User not found "});
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        console.log("Invalid credentials for: ", email);
        return res.status(401).json({error: "Invalid credentials"});
    }

    const token=jwt.sign({ id: user.id, email: user.email }, process.env.secretkey, { 
        expiresIn: '1h'
    });
    console.log("User logged in successfully: ", {name: user.name, email: user.email});
    res.status(200).json({ token, name: user.name, message: "Login successful" });

   } catch(error) {
    console.log("Login failed: ", error.message);
    res.status(500).json({ error: "Inernal Server Error "});
   }
};
