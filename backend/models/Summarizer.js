import mongoose from "mongoose";

const summarySchema = new mongoose.Schema({
    text : String,
    summary: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Summary = mongoose.model('Summary', summarySchema);

export default Summary;