import mongoose from "mongoose";
import AdmitCard from "./admitcard.models.js";
import AnswerKey from "./answerkey.models.js"

const postSchema = new mongoose.Schema({
    posttitle : { type : String , required : true},
    postname : { type : String , required : true},
    postshortname : { type : String , required : true},
    totalvacancies : { type : String , required : true},
    briefinformation : { type : String , required : true},
    startingdate : { type : String , required : true},
    endingdate : { type : String , required : true},
    qualification : { type : String , required : true},
    applylink : { type : String , required : true},
    postcategory : { type : String , required : true},
    location : { type : String , required : true},
    notificationLink : {type : String , required : true},
    youtubelink : {type : String , default : ""},
    officialwebsitelink : {type : String , default : ""},
    handpicked: { type: Boolean, default: false }, // To control whether post should be added in notification box or not

    admitCard : {type : mongoose.Schema.Types.ObjectId , ref : "AdmitCard"},
    answerKey : {type : mongoose.Schema.Types.ObjectId , ref : "AnswerKey"},
    
    tables : [
        {   
            id : {
                type : String,
                required : true
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

    boxes : [
        {
            id : {
                type : String,
                required : true
            },
            heading : {
                type : String,
                required : true
            },
            content : {
                type : String,
                required : true
            }
        }
    ]

} ,{timestamps : true})

const Post = mongoose.model("Post" , postSchema);
export default Post