import mongoose from "mongoose"
import Post from "../models/post.models.js";
import dotenv from "dotenv"
dotenv.config({})

let addYouTubeLink = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URL); // Connect to your DB

    const defaultYouTubeLink = "https://youtu.be/3FsPWD95Klo?feature=shared"; // Set your default link

    const result = await Post.updateMany(
      {}, // Empty filter means update all documents
      { $set: { youtubelink: defaultYouTubeLink } } // Add youtubeLink field
    );

    mongoose.disconnect();
  }
  catch (error) {
    console.error("Error updating posts:", error);
  }
}

addYouTubeLink();