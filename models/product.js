import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true

    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        default: "uncategory"
    },
    dimension: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true,
        default: true

    }, Image: {
        type: [String],
        required: true,
        default :["https://i.pinimg.com/736x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"]

    }
})
const product = mongoose.model("products", productSchema);

export default product;