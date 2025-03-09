import AnswerKey from "../models/answerkey.models.js";
import Post from "../models/post.models.js";

export let createAnswerKey = async(req , res) => {
    try {
        let { posttitle, postname, postshortname, totalvacancies, briefinformation, startingdate, endingdate, qualification, applylink, youtubelink , officialwebsitelink , postcategory, location , handpicked , associatedPost } = req.body;
        if (posttitle == "" || postname == "" || postshortname == "" || totalvacancies == "" || briefinformation == "" || startingdate == "" || endingdate == "" || qualification == "" || applylink == "" || postcategory == "" || location == "" || associatedPost == "") {
            res.status(400).json({
                message: "Fields are required",
                success: false
            })
        }

        const tables = req.body.tables ? JSON.parse(req.body.tables) : [];
        const boxes = req.body.boxes ? JSON.parse(req.body.boxes) : [];

        let newAnswerKey = await AnswerKey.create({
            posttitle, postname, postshortname, totalvacancies, handpicked , briefinformation, startingdate: new Date(startingdate), endingdate: new Date(endingdate), qualification, applylink , youtubelink , officialwebsitelink , postcategory, location, tables, boxes, notificationLink: req?.file?.path , associatedPost
        })

        newAnswerKey.save();

        let post = await Post.findById(associatedPost);
        if (!post) {
            return res.status(404).json({
                message: "Associated post not found",
                success: false
            });
        }

        post.answerKey = newAnswerKey._id;
        post.save();

        return res.status(200).json({
            message: "Answer Key Created successfully!",
            success: true
        })
    }
    catch (e) {
        return res.status(400).json({
            success: false
        })
    }
}

export let getAllAnswerKey = async(req , res) => {
    try{
        let allAnswerKey = await AnswerKey.find({}).sort({createdAt : -1}).populate("associatedPost");

        return res.status(200).json({
            allAnswerKey,
            success : true
        })
    }
    catch (e) {
        return res.status(400).json({
            success: false
        })
    }
}

export let deleteAnswerKey = async(req , res) => {
    try{
        let { id } = req.params;
        var regex = new RegExp(/^[a-f\d]{24}$/i);
        
         // Validate ObjectId format
        if (!regex.test(id)) {
            return res.status(400).json({ success: false, message: "Invalid Answer Key" });
        }

        let answerkey = await AnswerKey.findById(id);
        if(!answerkey){
            return res.status(400).json({
                message : "Answer Key Not Found",
                success : false
            })
        }

        await AnswerKey.findByIdAndDelete(id);
        let post = await Post.findById(answerkey?.associatedPost);
        if (!post) {
            return res.status(404).json({
                message: "Associated post not found",
                success: false
            });
        }

        post.answerKey = null,
        post.save();

        return res.status(200).json({
            message: "Answer Key deleted successfully!",
            success: true
        });

    }
    catch (e) {
        return res.status(400).json({
            success: false
        })
    }
}

let getFormattedDate = (d) => {

    const date = new Date(d); // eg we will pass -- Sat Feb 15 2025 05:30:00 GMT+0530

    // Extract the components
    const year = date.getFullYear(); // 2025
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 02 (months are 0-indexed)
    const day = String(date.getDate()).padStart(2, '0'); // 15

    // Combine to "yyyy-mm-dd"
    return `${year}-${month}-${day}`; // input type="date" expects date in yyyy-mm-dd that is why we are doing this so that we can show this in fronend.
}

export let getCurrAnswerKey = async(req , res) => {
    try{
        let {id} = req.params;
        var regex = new RegExp(/^[a-f\d]{24}$/i);
        
         // Validate ObjectId format
        if (!regex.test(id)) {
            return res.status(400).json({ success: false, message: "Invalid Answer Key ID" });
        }

        let answerKey = await AnswerKey.findById(id)?.populate("associatedPost");
        if(!answerKey){
            return res.status(400).json({
                message : "Id is wrong!",
                success : false
            })
        }

        answerKey.endingdate = getFormattedDate(answerKey.endingdate);
        answerKey.startingdate = getFormattedDate(answerKey.startingdate);

        return res.status(200).json({
            answerKey,
            success : true
        })

    }
    catch (e) {
        return res.status(400).json({
            success: false
        })
    }
}

export let editAnswerKey = async(req , res) => {
    try{
        let {id} = req.params;
        var regex = new RegExp(/^[a-f\d]{24}$/i);
        
         // Validate ObjectId format
        if (!regex.test(id)) {
            return res.status(400).json({ success: false, message: "Invalid Post ID" });
        }

        let answerKey = await AnswerKey.findById(id);
        if(!answerKey) {
            return res.status(400).json({
                success : false,
                message: "Invalid Post ID"
            })
        }
        
        let { posttitle, postname, postshortname, totalvacancies, handpicked, briefinformation, startingdate, endingdate, qualification, applylink, youtubelink , officialwebsitelink , postcategory, location , associatedPost } = req.body;
        if (posttitle == "" || postname == "" || postshortname == "" || totalvacancies == "" || briefinformation == "" || startingdate == "" || endingdate == "" || qualification == "" || applylink == "" || postcategory == "" || location == "") {
            res.status(400).json({
                message: "Fields are required",
                success: false
            })
        }

        const tables = req.body.tables ? JSON.parse(req.body.tables) : [];
        const boxes = req.body.boxes ? JSON.parse(req.body.boxes) : [];

        let newAnswerKey = await AnswerKey.findByIdAndUpdate(id , {
            posttitle, postname, postshortname, totalvacancies, handpicked , briefinformation, startingdate: new Date(startingdate), endingdate: new Date(endingdate), qualification, applylink, youtubelink , officialwebsitelink , postcategory, location, tables, boxes , associatedPost
        } , {new : true})

        if(req.file){
            newAnswerKey.notificationLink = req.file?.path;
            await newAnswerKey.save();
        }

        return res.status(200).json({
            message: "Post Edited successfully!",
            success: true
        })
    }
    catch (e) {
        res.status(400).json({
            success: false
        })
    }
}
