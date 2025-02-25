import mongoose from "mongoose";

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
    
    tables : [
        {   
            id : {
                type : String,
                required : true
            },
            name: {
                type: String,
                required: true,  // Ensures that 'name' is always provided
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