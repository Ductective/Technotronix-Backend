const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    firstName: {type:String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    phone: {type: String, required: true},
    img:{type: String, default: "upload/avatar.png"},
    password:{type: String, required: true},
    role:{type: String, enum: [ "admin", "client"], default: "client"}
}, {timestamps:true})

userSchema.methods.generateAuthToken = () => {
    const token = jwt.sign(
        { id:this._id, role: this.role},
        process.env.JWT_SECRET_KEY
    );
    return token
};
module.exports = mongoose.model("User", userSchema)