import dotenv from "dotenv"
dotenv.config({path : "../.env"})
import mongoose from "mongoose"
import Post from "../models/post.models.js";

let addYouTubeLink = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URL); // Connect to your DB

    const defaultyoutubelink = "https://www.youtube.com/embed/3FsPWD95Klo?si=1dUwK86iO8J11rdq"; // Set your default link

    const result = await Post.updateMany(
      {}, // Empty filter means update all documents
      { $set: { youtubelink : defaultyoutubelink } } // Add youtubeLink field
    );

    mongoose.disconnect();
  }
  catch (error) {
    console.error("Error updating posts:", error);
  }
}

addYouTubeLink();