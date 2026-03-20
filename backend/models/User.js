import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minLength: 8,
    },
    diabetesRecord:[{type:mongoose.Schema.Types.ObjectId, ref:"Diabetes"}],
    
}, { timestamps: true });

export default mongoose.model("User", userSchema);