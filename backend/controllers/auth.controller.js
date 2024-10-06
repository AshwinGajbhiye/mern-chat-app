import bcrypt from "bcryptjs/dist/bcrypt.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookies from "../utils/generateToken.js";

export const signup = async (req, res) => {

    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "password does not match" });
        }

        const user = await User.findOne({ username });
        if (user) return res.status(400).json({ error: "username already exist" });

        // hash password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyprofilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlprofilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyprofilePic : girlprofilePic
        })


        if (newUser) {
            // generate jwt token
            generateTokenAndSetCookies(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser.id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        }
        else {
            res.status(201).json({ error: "Invalid user data" });
        }


    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(400).json({ error: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try {
        const {username,password} = req.body;

        const user =  await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password , user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"});
        }

        generateTokenAndSetCookies(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic,
        });

    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(400).json({ error: "Internal server error" });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt"," ",{maxAge:0});
        res.status(200).json({message:"Logged out succesfully"});
        
    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(400).json({ error: "Internal server error" }); 
    }
}