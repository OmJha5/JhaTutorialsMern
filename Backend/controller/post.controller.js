import Post from "../models/post.models.js";

export let createPost = async (req, res) => {
    try {
        let { posttitle, postname, postshortname, totalvacancies, briefinformation, startingdate, endingdate, qualification, applylink, postcategory, location } = req.body;
        if (posttitle == "" || postname == "" || postshortname == "" || totalvacancies == "" || briefinformation == "" || startingdate == "" || endingdate == "" || qualification == "" || applylink == "" || postcategory == "" || location == "") {
            res.status(400).json({
                message: "Fields are required",
                success: false
            })
        }

        const tables = req.body.tables ? JSON.parse(req.body.tables) : [];
        const boxes = req.body.boxes ? JSON.parse(req.body.boxes) : [];

        let newPost = await Post.create({
            posttitle, postname, postshortname, totalvacancies, briefinformation, startingdate: new Date(startingdate), endingdate: new Date(endingdate), qualification, applylink, postcategory, location, tables, boxes, notificationLink: req?.file?.path
        })

        newPost.save();

        return res.status(200).json({
            message: "Post Added successfully!",
            success: true
        })
    }
    catch (e) {
        res.status(400).json({
            success: false
        })
    }
}

export let getAllPosts = async (req, res) => {
    try {
        let allPosts = await Post.find({}).sort({createdAt : -1});

        // Format each post's endingtime
        allPosts = allPosts.map(post => {
            const date = new Date(post.endingdate);
            const formattedDate = date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            });

            return { ...post.toObject(), endingdate: formattedDate };
        });


        return res.status(200).json({
            allPosts, success: true
        })
    }
    catch (e) {
        res.status(400).json({
            success: false
        })
    }
}

export let deletePost = async (req, res) => {
    try {
        let { id } = req.params;

        await Post.deleteOne({ _id: id });

        return res.status(200).json({
            message: "Post deleted successfully",
            success: true
        })
    }
    catch (e) {
        res.status(400).json({
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

export let getPostById = async (req, res) => {
    try {
        let { id } = req.params;

        let post = await Post.findById(id);

        post.endingdate = getFormattedDate(post.endingdate);
        post.startingdate = getFormattedDate(post.startingdate);

        return res.status(200).json({
            post, success: true
        })
    }
    catch (e) {
        res.status(400).json({
            success: false
        })
    }
}

export let editPost = async(req , res) => {
    try{
        let {id} = req.params;
        let { posttitle, postname, postshortname, totalvacancies, briefinformation, startingdate, endingdate, qualification, applylink, postcategory, location } = req.body;
        if (posttitle == "" || postname == "" || postshortname == "" || totalvacancies == "" || briefinformation == "" || startingdate == "" || endingdate == "" || qualification == "" || applylink == "" || postcategory == "" || location == "") {
            res.status(400).json({
                message: "Fields are required",
                success: false
            })
        }

        const tables = req.body.tables ? JSON.parse(req.body.tables) : [];
        const boxes = req.body.boxes ? JSON.parse(req.body.boxes) : [];

        let newPost = await Post.findByIdAndUpdate(id , {
            posttitle, postname, postshortname, totalvacancies, briefinformation, startingdate: new Date(startingdate), endingdate: new Date(endingdate), qualification, applylink, postcategory, location, tables, boxes
        } , {new : true})

        if(req.file){
            newPost.notificationLink = req.file?.path;
            await newPost.save();
        }

        return res.status(200).json({
            message: "Post Eddited successfully!",
            success: true
        })
    }
    catch (e) {
        res.status(400).json({
            success: false
        })
    }
}

export let getPostByQuery = async(req , res) => {
    try{
        let keyword = req.query?.keyword || ""

        const query = {
            $or : [
                {briefinformation : {$regex : keyword , $options : "i"}},
                {qualification : {$regex : keyword , $options : "i"}},
                {postcategory : {$regex : keyword , $options : "i"}},
                {location : {$regex : keyword , $options : "i"}},
            ]
        };

        let allPosts = await Post.find(query);
        
        return res.status(200).json({
            allPosts,
            success : true
        })

    }
    catch (e) {
        res.status(400).json({
            success: false
        })
    }
}

export let getTop9Post = async(req , res) => {
    try{
        const topPosts = await Post.find().sort({ createdAt: -1 }).limit(9);

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

export let getTop5GraduationAndPGPost = async(req , res) => {
    try{
        const topPosts = await Post.find({postcategory : {$in : ["graduationjobs", "pgpassjobs"]}}).sort({ createdAt: -1 }).limit(5);

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

export let getTop5TwelthPosts = async(req , res) => {
    try{
        const topPosts = await Post.find({postcategory : "12thleveljobs"}).sort({ createdAt: -1 }).limit(5);

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


