
import mongoose, { Types } from "mongoose";


const inquirySchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    massage: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    response: {
        type: String,
        required: false,
        default: ""
    },
    isResolved: {
        type: Boolean,
        required: true,
        default: false
    }   

})

const inquiry =mongoose.model("inquiry",inquirySchema);

export default inquiry;