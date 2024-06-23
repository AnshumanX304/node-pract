const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username:{
    type:String,
    required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
    
    
}, { timestamps: true });

const UserModel = mongoose.model("USER",userSchema);

module.exports=UserModel;
