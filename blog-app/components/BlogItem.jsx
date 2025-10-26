import { assets, blog_data } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const BlogItem = ({ title, category, img, description }) => {
  return (
    <div className="w-auto border my-3 border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 shadow-black">
      <Image src={img} alt="" width={500} height={500} />
      <div className="p-6">
        <p className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
          {category}
        </p>
        <div className="space-y-4">
          <h5 className="text-xl font-bold text-gray-900 leading-tight">
            {title}
          </h5>
          <p className="text-gray-600 leading-relaxed">{description}</p>
          <div className="pt-2">
            <button className="px-6 py-2 border border-gray-900 text-gray-900 font-medium rounded-md hover:bg-gray-900 hover:text-white transition-colors duration-200">
              Read more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
