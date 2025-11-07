"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const [image, setImage] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const categories = ["Technology", "Startup", "Lifestyle"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      ...formData,
      image: image,
      date: Date.now(),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Blog Post
          </h1>
          <p className="text-gray-600">
            Fill in the details below to publish a new blog post
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg border border-gray-200 p-8">
          {/* Image Upload Section */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-900 mb-4">
              Upload Thumbnail
            </label>
            <label htmlFor="image" className="cursor-pointer block">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors duration-200">
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={
                      image ? URL.createObjectURL(image) : assets.upload_area
                    }
                    alt="upload-image"
                    width={200}
                    height={200}
                    className="mb-4 object-cover rounded-lg bg-gray-100"
                  />
                  <div className="text-center">
                    <p className="text-gray-700 font-medium mb-1">
                      {image ? "Change Image" : "Click to upload"}
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, WEBP up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
              accept="image/*"
            />
          </div>

          {/* Title Field */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-900 mb-2">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter a compelling title for your blog post"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
              required
            />
          </div>

          {/* Category Field */}
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-900 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 bg-white text-gray-900 appearance-none cursor-pointer"
              required>
              <option value="" disabled className="text-gray-500">
                Select a category
              </option>
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  className="text-gray-900">
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Description Field */}
          <div className="mb-8">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-900 mb-2">
              Blog Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Write a brief description of your blog post..."
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 resize-vertical"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200">
              Publish Blog
            </button>
          </div>
        </form>

        {/* Preview Section (Optional) */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Preview</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <span className="font-medium text-gray-900">Title:</span>{" "}
              {formData.title || "No title"}
            </p>
            <p>
              <span className="font-medium text-gray-900">Category:</span>{" "}
              {formData.category || "No category selected"}
            </p>
            <p>
              <span className="font-medium text-gray-900">Description:</span>{" "}
              {formData.description || "No description"}
            </p>
            <p>
              <span className="font-medium text-gray-900">Image:</span>{" "}
              {image ? "Uploaded" : "No image"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
