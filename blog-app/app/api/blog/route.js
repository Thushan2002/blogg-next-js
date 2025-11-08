import { connectDB } from "@/lib/config/db";
import Blog from "@/lib/models/blog";
import { writeFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";


// POST: create new blog
export async function GET(request) {
    try {
        await connectDB()
        const blogs = await Blog.find({})
        return NextResponse.json({ success: true, data: blogs }, { status: 200 })
    } catch (error) {
        console.error("Fetchig blogs error:", error);
        return NextResponse.json({ error: "Fetchig blogs Error" }, { status: 500 });
    }
}

// POST: create new blog
export async function POST(request) {
    try {
        await connectDB();
        const formData = await request.formData();

        // 1.handle image upload
        const image = formData.get("image");

        if (!image) {
            return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
        }

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), "public", "uploads");

        // 1.1 ensure uploads directory exists
        await mkdir(uploadDir, { recursive: true });

        const fileName = `${Date.now()}_${image.name}`;
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);

        // 1.2 create URL (publicly accessible)
        const imgUrl = `/uploads/${fileName}`;

        // 2. handle blog data

        const blogData = {
            title: `${formData.get("title")}`,
            description: `${formData.get("description")}`,
            category: `${formData.get("category")}`,
            author: `${formData.get("author")}`,
            image: `${imgUrl}`,
            authorImg: `${formData.get("authorImg")}`
        }

        const newBlog = await Blog.create(blogData)
        return NextResponse.json({ success: true, message: "Blog Created", data: newBlog }, { status: 201 });
    } catch (error) {
        console.error("File upload error:", error);
        return NextResponse.json({ error: "Error uploading file" }, { status: 500 });
    }
}
