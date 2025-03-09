import AdmitCard from "../models/admitcard.models.js";
import Post from "../models/post.models.js";

export let createAdmitCard = async(req , res) => {
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

        let newAdmitCard = await AdmitCard.create({
            posttitle, postname, postshortname, totalvacancies, handpicked , briefinformation, startingdate: new Date(startingdate), endingdate: new Date(endingdate), qualification, applylink , youtubelink , officialwebsitelink , postcategory, location, tables, boxes, notificationLink: req?.file?.path , associatedPost
        })

        newAdmitCard.save();

        let post = await Post.findById(associatedPost);
        if (!post) {
            return res.status(404).json({
                message: "Associated post not found",
                success: false
            });
        }

        post.admitCard = newAdmitCard._id;
        post.save();

        return res.status(200).json({
            message: "Admit Card Created successfully!",
            success: true
        })
    }
    catch (e) {
        return res.status(400).json({
            success: false
        })
    }
}

export let getAllAdmitCard = async(req , res) => {
    try{
        let allAdmitCard = await AdmitCard.find({}).sort({createdAt : -1}).populate("associatedPost");

        return res.status(200).json({
            allAdmitCard,
            success : true
        })
    }
    catch (e) {
        return res.status(400).json({
            success: false
        })
    }
}

export let deleteAdmitCard = async(req , res) => {
    try{
        let { id } = req.params;
        var regex = new RegExp(/^[a-f\d]{24}$/i);
        
         // Validate ObjectId format
        if (!regex.test(id)) {
            return res.status(400).json({ success: false, message: "Invalid Admit Card ID" });
        }

        let admitCard = await AdmitCard.findById(id);
        if(!admitCard){
            return res.status(400).json({
                message : "Admit Card Not Found",
                success : false
            })
        }

        await AdmitCard.findByIdAndDelete(id);
        let post = await Post.findById(admitCard?.associatedPost);
        if (!post) {
            return res.status(404).json({
                message: "Associated post not found",
                success: false
            });
        }

        post.admitCard = null,
        post.save();

        return res.status(200).json({
            message: "Admit Card deleted successfully!",
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

export let getCurrAdmitCard = async(req , res) => {
    try{
        let {id} = req.params;
        var regex = new RegExp(/^[a-f\d]{24}$/i);
        
         // Validate ObjectId format
        if (!regex.test(id)) {
            return res.status(400).json({ success: false, message: "Invalid Admit Card ID" });
        }

        let admitCard = await AdmitCard.findById(id)?.populate("associatedPost");
        if(!admitCard){
            return res.status(400).json({
                message : "Id is wrong!",
                success : false
            })
        }

        admitCard.endingdate = getFormattedDate(admitCard.endingdate);
        admitCard.startingdate = getFormattedDate(admitCard.startingdate);

        return res.status(200).json({
            admitCard,
            success : true
        })

    }
    catch (e) {
        return res.status(400).json({
            success: false
        })
    }
}

export let editAdmitCard = async(req , res) => {
    try{
        let {id} = req.params;
        var regex = new RegExp(/^[a-f\d]{24}$/i);
        
         // Validate ObjectId format
        if (!regex.test(id)) {
            return res.status(400).json({ success: false, message: "Invalid Post ID" });
        }

        let admitCard = await AdmitCard.findById(id);
        if(!admitCard) {
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

        let newAdmitCard = await AdmitCard.findByIdAndUpdate(id , {
            posttitle, postname, postshortname, totalvacancies, handpicked , briefinformation, startingdate: new Date(startingdate), endingdate: new Date(endingdate), qualification, applylink, youtubelink , officialwebsitelink , postcategory, location, tables, boxes , associatedPost
        } , {new : true})

        if(req.file){
            newAdmitCard.notificationLink = req.file?.path;
            await newAdmitCard.save();
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

export let getTop5Post = async(req , res) => {
    try{
        const topPosts = await AdmitCard.find({}).sort({ createdAt: -1 }).limit(5);

        return res.status(200).json({
            topPosts,
            success : true,
        })
    }
    catch (e) {
        res.status(400).json({
            success: false
        })
    }
}