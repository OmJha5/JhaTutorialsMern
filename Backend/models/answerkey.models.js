import mongoose from "mongoose";
import Post from "./post.models.js";

const answerkeySchema = new mongoose.Schema({
    posttitle: { type: String, required: true },
    postname: { type: String, required: true },
    postshortname: { type: String, required: true },
    totalvacancies: { type: String, required: true },
    briefinformation: { type: String, required: true },
    startingdate: { type: String, required: true },
    endingdate: { type: String, required: true },
    qualification: { type: String, required: true },
    applylink: { type: String, required: true },
    postcategory: { type: String, required: true },
    location: { type: String, required: true },
    notificationLink: { type: String, required: true },
    youtubelink: { type: String, default: "" },
    officialwebsitelink: { type: String, default: "" },
    handpicked: { type: Boolean, default: false }, // To control whether post should be added in notification box or not

    tables: [
        {
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true,
            },
            headers: {
                type: [String],   // Array of strings for headers
                default: []
            },
            data: {
                type: [[String]], // Array of arrays of strings
                default: [[]]
            }
        }
    ],

    boxes: [
        {
            id: {
                type: String,
                required: true
            },
            heading: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            }
        }
    ],
    associatedPost: { type : mongoose.Schema.Types.ObjectId , ref : "Post" }

}, { timestamps: true })

const AnswerKey = mongoose.model("AnswerKey", answerkeySchema);
export default AnswerKey