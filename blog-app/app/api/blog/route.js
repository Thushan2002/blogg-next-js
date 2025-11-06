import { connectDB } from "@/lib/config/db";
import Blog from "@/lib/models/blog";
import { writeFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { title } from "process";

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
        return NextResponse.json({ sucess: true, message: "Blog Created", data: newBlog }, { status: 201 });
    } catch (error) {
        console.error("File upload error:", error);
        return NextResponse.json({ error: "Error uploading file" }, { status: 500 });
    }
}
