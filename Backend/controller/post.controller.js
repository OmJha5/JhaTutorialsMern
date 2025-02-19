import Post from "../models/post.models.js";

export let createPost = async(req , res) => {
    try{
        let {posttitle , postname , postshortname , totalvacancies , briefinformation , startingdate , endingdate , qualification , applylink , postcategory , location} = req.body;
        if(posttitle == "" || postname == "" || postshortname == "" || totalvacancies == "" || briefinformation == "" || startingdate == "" || endingdate == "" || qualification == "" || applylink == "" || postcategory == "" || location == "" ){
            res.status(400).json({
                message : "Fields are required",
                success : false
            })
        }

        const tables = req.body.tables ? JSON.parse(req.body.tables) : [];
        const boxes = req.body.boxes ? JSON.parse(req.body.boxes) : [];

        let newPost = await Post.create({
            posttitle , postname , postshortname , totalvacancies , briefinformation , startingdate , endingdate , qualification , applylink , postcategory , location , tables , boxes , notificationLink : req?.file?.path
        })

        newPost.save();

        return res.status(200).json({
            message : "Post Added successfully!",
            success : true
        })
    }
    catch(e){
        res.status(400).json({
            success : false
        })
    }
}