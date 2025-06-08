import mongoose from "mongoose";

const Contactform = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        // unique: true,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    messagedAt: {
        type: Date,
        default: Date.now(),
    }
})

export default mongoose.models.Contactform || mongoose.model('Contactform', Contactform)