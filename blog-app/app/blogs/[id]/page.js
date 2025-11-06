import { blog_data } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const post = blog_data.find((data) => data.id == id);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Post Not Found
          </h1>
          <p className="text-gray-600">
            The blog post you're looking for doesn't exist.
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
          <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
              {post.author_img && (
                <Image
                  src={post.author_img}
                  alt={post.author}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <span className="font-medium text-gray-900">{post.author}</span>
          </div>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span>•</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full">
            {post.category}
          </span>
        </div>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-8">
            <Image
              src={post.image}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg bg-gray-100"
            />
          </div>
        )}

        {/* Content */}
        <article className="prose prose-gray max-w-none">
          <div className="bg-white rounded-lg">
            <p className="text-gray-700 leading-relaxed text-lg">
              {post.description}
            </p>

            {/* If you have additional content, you can add it here */}
            <div className="mt-8 text-gray-600 space-y-4">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
              <p>
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
              <p>
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages.
              </p>
            </div>
          </div>
        </article>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Author Bio */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
              {post.author_img && (
                <Image
                  src={post.author_img}
                  alt={post.author}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{post.author}</h3>
              <p className="text-sm text-gray-600">Blog Author</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm">
            This article was written by {post.author}, covering topics related
            to {post.category.toLowerCase()}
            and personal development.
          </p>
        </div>
      </main>
    </div>
  );
};

export default page;
