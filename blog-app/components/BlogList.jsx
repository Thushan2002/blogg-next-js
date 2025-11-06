"use client";
import { blog_data } from "@/assets/assets";
import React, { useState } from "react";
import BlogItem from "./BlogItem";
import { useRouter } from "next/navigation";

export const BlogList = () => {
  const [category, setCategory] = useState("all");
  const router = useRouter();

  return (
    <div>
      <div className="my-3 flex justify-center items-center gap-5">
        {["all", "technology", "startup", "lifestyle"].map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setCategory(cat)}
            className={`p-2 rounded-md cursor-pointer w-[100px]  border border-black ${
              category === cat ? "bg-black text-white" : "bg-white text-black"
            }`}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      <div className="my-5  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {blog_data
          .filter(
            (item) =>
              category === "all" || category === item.category.toLowerCase()
          )
          .map((blog, idx) => {
            return (
              <BlogItem
                onClick={() => router.push(`/blogs/${blog.id}`)}
                key={idx}
                title={blog.title}
                description={blog.description}
                category={blog.category}
                img={blog.image}
              />
            );
          })}
      </div>
    </div>
  );
};
