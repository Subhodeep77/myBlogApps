import { Router } from "express";
import multer from "multer";
import BLOG from "../models/blog.js";
import path from 'path';

const router = Router()

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.resolve("./public/uploads/"))
    },
    filename:function(req,file,cb){
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null,filename)   
    }
})

const upload = multer({storage:storage})

router.post("/",upload.single("coverImage"),async (req,res)=>{
    const { title,body } = req.body
    const blog = await BLOG.create({
        body,
        title,
        createdBy:req.user._id,
        coverImageUrl:`/uploads/${req.file.filename}`
    })
    return res.status(200).json({ message: "Success"});
})

export default router
