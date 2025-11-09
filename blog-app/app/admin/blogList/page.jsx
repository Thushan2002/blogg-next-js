"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import { assets } from "@/assets/assets";
import Link from "next/link";

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/blog");
      const data = response.data;
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      setBlogs([]);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/blog`, {
        params: {
          id,
        },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully");
    } catch (error) {
      toast.error("Failed to delete blog");
    } finally {
      setDeleteConfirm(null);
    }
  };

  const openDeleteConfirm = (id, title) => {
    setDeleteConfirm({ id, title });
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirm(null);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter blogs based on search and category
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = ["all", ...new Set(blogs.map((blog) => blog.category))];

  // Loading spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-700 font-medium">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Stats */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Blog Management
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Manage all your blog posts in one place
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
              <p className="text-xs sm:text-sm text-gray-600">Total Blogs</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {blogs.length}
              </p>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blogs by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white text-gray-900">
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="capitalize">
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              Showing {filteredBlogs.length} of {blogs.length} blogs
            </p>
            {(searchTerm || selectedCategory !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Blogs Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col h-full">
                {/* Blog Image */}
                <div className="h-48 sm:h-56 bg-gray-200 overflow-hidden relative">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Blog Content */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  {/* Category and Date */}
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full capitalize">
                      {blog.category}
                    </span>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {formatDate(blog.date)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 flex-1">
                    {blog.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.description}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 mb-4 pt-4 border-t border-gray-100">
                    <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                      <Image
                        src={blog.author_img || assets.profile_icon}
                        alt={blog.author}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {blog.author}
                      </p>
                      <p className="text-xs text-gray-500">Author</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <span>✏️</span>
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteConfirm(blog._id, blog.title)}
                      className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200">
                      <span>🗑️</span>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12 sm:py-16">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl sm:text-4xl text-gray-400">📝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {blogs.length === 0 ? "No Blog Posts" : "No matching blogs found"}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm sm:text-base">
              {blogs.length === 0
                ? "You haven't created any blog posts yet."
                : "Try adjusting your search or filter criteria."}
            </p>
            {blogs.length === 0 && (
              <Link href={"/admin/addProduct"}>
                <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm sm:text-base">
                  Create Your First Blog
                </button>
              </Link>
            )}
            {(searchTerm || selectedCategory !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base">
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 backdrop-blur-xl bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-md w-full mx-4">
              <div className="text-center mb-2">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">⚠️</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Delete Blog?
                </h3>
                <p className="text-gray-600 text-sm">
                  Are you sure you want to delete{" "}
                  <span className="font-medium text-gray-900 block truncate">
                    "{deleteConfirm.title}"
                  </span>
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={closeDeleteConfirm}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 order-2 sm:order-1">
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm.id)}
                  className="flex-1 px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 order-1 sm:order-2">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
