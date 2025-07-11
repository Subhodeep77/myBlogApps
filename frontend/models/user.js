import { Schema, model } from "mongoose";
import { createHmac, randomBytes } from "node:crypto";
import { createTokenForUser } from "../services/authentication.js";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    salt: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: "/images/user.svg"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true });


userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return; 

    const salt = randomBytes(16).toString("hex"); 
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex"); 

    user.salt = salt;
    user.password = hashedPassword;

    next();
});

userSchema.static("matchPasswordAndGenerateToken",async function(email,password){
    const user = await this.findOne({email})
    if(!user)throw new Error("User not found")

    const salt = user.salt
    const hashedPassword = user.password

    const userProvidedHash = createHmac("sha256",salt)
    .update(password)
    .digest("hex")

    if(hashedPassword!==userProvidedHash)throw new Error("Wrong Password")

    const token = createTokenForUser(user)
    return token
})

const USER = model("USER", userSchema);

export default USER;
