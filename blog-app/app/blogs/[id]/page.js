"use client";
import axios from "axios";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = ({ params }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = use(params);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/blog", { params: { id } });
        const data = res.data;
        if (data.success) {
          setBlog(data.data);
        } else {
          setBlog(null);
          toast.error("Failed to load blog");
        }
      } catch (error) {
        console.error(error);
        setBlog(null);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  // Spinner UI while loading
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-800 font-medium">Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Blog Not Found
          </h1>
          <p className="text-gray-600">
            The blog you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
              {blog.authorImg && (
                <Image
                  src={blog.authorImg}
                  alt={blog.author}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <span className="font-medium text-gray-900">{blog.author}</span>
          </div>
          <span>•</span>
          <span>{new Date(blog.date).toLocaleDateString()}</span>
          <span>•</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full">
            {blog.category}
          </span>
        </div>

        {/* Featured Image */}
        {blog.image && (
          <div className="mb-8">
            <Image
              src={blog.image}
              alt={blog.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-lg bg-gray-100"
            />
          </div>
        )}

        {/* Content */}
        <article className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg">
            {blog.description}
          </p>
        </article>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Author Bio */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
              {blog.authorImg && (
                <Image
                  src={blog.authorImg}
                  alt={blog.author}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{blog.author}</h3>
              <p className="text-sm text-gray-600">Blog Author</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm">
            This article was written by {blog.author}, covering topics related
            to {blog.category?.toLowerCase()} and personal development.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Page;
