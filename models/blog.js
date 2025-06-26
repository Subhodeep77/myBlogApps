import { Schema,model } from "mongoose";

const blogSchema = new Schema({
    title:{
        required:true,
        type:String,
    },
    body:{
        type:String,
        required:true
    },
    coverImageUrl:{
        type:String
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"USER"
    }
},{timestamps:true})


const BLOG = model("BLOG",blogSchema)

export default BLOG