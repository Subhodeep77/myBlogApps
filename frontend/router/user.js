import { Router } from "express";
import USER from "../models/user.js";
import { log } from "node:console";

const router = Router();

// router.get("/signin",(req,res)=>{
    
// })

// router.get("/signUp",(req,res)=>{

// })

router.get("/check-auth",(req,res)=>{
        if(req.user){ 
            return res.status(200).json({loggedIn:true}) 
        }
        else return res.status(200).json({loggedIn:false})   
})

router.post("/signin",async (req,res)=>{
    const { email,password } = req.body

    try {
        console.log(email);
        const token = await USER.matchPasswordAndGenerateToken(email,password)
        console.log("token",token);

        return res.cookie("token", token, {
            httpOnly: true,
        })
        .status(200)
        .json({ message: "Login successful" });
    } catch (error) {
        console.log("Error","Incorrect email or password")
    }

})


router.post("/signup", async (req, res) => {
    console.log(req.body)
    const { fullName, email, password } = req.body;
    try {
        const newUser = await USER.create({
            fullName,
            email,
            password
        });
        res.status(201).json({ message: "User created", user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/logout",(req,res)=>{
    res.clearCookie("token", {
        httpOnly: true,
    });
    res.status(200).json({ message: "Logged out successfully" });
})

export default router;
