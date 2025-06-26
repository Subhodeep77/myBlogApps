import express from "express"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import userRouter from "./router/user.js"
import blogRouter from "./router/blog.js"
import commentsRouter from "./router/comments.js"
import { checkForAuthenticationCookie } from "./middlewares/authentication.js"
import BLOG from "./models/blog.js"
import COMMENT from "./models/comments.js"

mongoose.connect("mongodb://localhost:27017/myBlogApp")
.then(()=>console.log("MongoDb connected"))

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(checkForAuthenticationCookie("token"))
app.use('/public', express.static('public'))



app.get('/api',async (req,res)=>{
    const allBlogs = await BLOG.find({}).sort("-createdAt")
    return res.status(200).json(allBlogs)
})

app.get('/api/blog/:id',async (req,res)=>{
    const { id } =req.params
    try {
        const blog = await BLOG.findById(id)
        const comments = await COMMENT.find({ forWhichBlog: id }).populate('createdBy', 'fullName');
        if(!blog){
            return res.status(404).json({ message:"Blog not found"}) 
        }
        return res.status(200).json({blog,comments})
    } catch (error) {
        return res.status(404).json({ message:"Blog not found"})
    }
})



app.use("/api/user",userRouter)
app.use("/api/blog",blogRouter)
app.use("/api/comment",commentsRouter)

app.listen(8000,()=>console.log("listening on port 8000"))