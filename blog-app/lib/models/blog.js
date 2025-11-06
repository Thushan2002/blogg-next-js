import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String }, // store image URL or path
        date: { type: Date, default: Date.now },
        category: { type: String },
        author: { type: String },
        author_img: { type: String }, // store author image URL
    },
    { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog
