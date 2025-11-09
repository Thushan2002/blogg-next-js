import { connectDB } from "@/lib/config/db";
import Blog from "@/lib/models/blog";
import { writeFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

// GET: Fetch all blogs or a single blog by ID
export async function GET(request) {
    try {
        await connectDB();

        const blogId = request.nextUrl.searchParams.get("id");

        if (blogId) {
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
            }
            return NextResponse.json({ success: true, data: blog }, { status: 200 });
        } else {
            const blogs = await Blog.find({});
            return NextResponse.json({ success: true, data: blogs }, { status: 200 });
        }
    } catch (error) {
        console.error("Fetching blogs error:", error);
        return NextResponse.json({ success: false, error: "Error fetching blogs" }, { status: 500 });
    }
}

// POST: Create new blog
export async function POST(request) {
    try {
        await connectDB();
        const formData = await request.formData();

        // Handle image upload
        const image = formData.get("image");
        if (!image) {
            return NextResponse.json({ success: false, error: "No image uploaded" }, { status: 400 });
        }

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });

        const fileName = `${Date.now()}_${image.name}`;
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);

        // Publicly accessible URL
        const imgUrl = `/uploads/${fileName}`;

        // Create blog document
        const blogData = {
            title: formData.get("title") || "",
            description: formData.get("description") || "",
            category: formData.get("category") || "",
            author: formData.get("author") || "",
            image: imgUrl,
            authorImg: formData.get("authorImg") || "",
        };

        const newBlog = await Blog.create(blogData);

        return NextResponse.json(
            { success: true, message: "Blog Created", data: newBlog },
            { status: 201 }
        );
    } catch (error) {
        console.error("File upload error:", error);
        return NextResponse.json({ success: false, error: "Error uploading file" }, { status: 500 });
    }
}

// DELETE: Delete single blog by ID
export async function DELETE(request) {
    try {
        await connectDB();

        const blogId = request.nextUrl.searchParams.get("id");

        if (!blogId) {
            return NextResponse.json(
                { success: false, error: "Missing blog ID" },
                { status: 400 }
            );
        }

        // Find the blog in the database
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return NextResponse.json(
                { success: false, error: "Blog not found" },
                { status: 404 }
            );
        }

        // Get the image path (stored as `/uploads/filename.jpg`)
        if (blog.image) {
            // Resolve full path in the local filesystem
            const imagePath = path.join(process.cwd(), "public", blog.image);

            try {
                // Check if file exists before deleting
                await fs.access(imagePath);
                await fs.unlink(imagePath);
            } catch (err) {
                console.warn("Image not found or already deleted:", imagePath);
            }
        }

        // Delete blog from DB
        await Blog.findByIdAndDelete(blogId);

        return NextResponse.json(
            { success: true, message: "Blog and image deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Deleting blog error:", error);
        return NextResponse.json(
            { success: false, error: "Error deleting blog" },
            { status: 500 }
        );
    }
}