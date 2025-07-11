import { Schema,model } from "mongoose";

const commentSchema = new Schema({
    body:{
        required:true,
        type:String
    },
    forWhichBlog:{
        type:Schema.Types.ObjectId,
        ref:"BLOG"
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"USER"
    }
},{timestamps:true})

const COMMENT = model("COMMENT",commentSchema)

export default COMMENT