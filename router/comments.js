import { Router } from "express";
import USER from "../models/user.js";
import COMMENT from "../models/comments.js";

const router = Router()



router.post("/blog", async (req,res)=>{
    try {
        const user = await USER.findOne({email:req.user.email})
        const fullName = user.fullName
        const { forWhichBlog,body } = req.body
        const comment = await COMMENT.create({
            body,
            createdBy:req.user._id,
            forWhichBlog
        })
        const populatedComment = await COMMENT.findById(comment._id).populate("createdBy", "fullName");
        return res.status(200).json({comment:populatedComment})
    } catch (error) {
        console.log("Cant create comment",error ); 
        return res.status(404).json({error:"cant create comment"})
    }
})

export default router