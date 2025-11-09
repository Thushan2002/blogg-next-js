"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Sidebar = () => {
  const location = usePathname();
  const myPath = location.split("/").pop();

  const [activeItem, setActiveItem] = useState(myPath);

  const menuItems = [
    { icon: assets.add_icon, label: "Add Blogs", href: "/admin/addProduct" },
    { icon: assets.blog_icon, label: "List Blogs", href: "/admin/blogList" },
    {
      icon: assets.email_icon,
      label: "Subscription",
      href: "/admin/subscriptions",
    },
  ];

  return (
    <div className="w-64 p-4 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <Image src={assets.logo} alt="logo" width={120} />
      {/* Sidebar Header */}
      <div className="mb-8 pt-10 border-b border-gray-100 flex gap-2 flex-col">
        <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
        <p className="text-sm text-gray-600 mt-1">Blog Management</p>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-1 flex-1 flex flex-col">
        {menuItems.map((item, index) => (
          <Link href={item.href} key={index}>
            <button
              onClick={() => setActiveItem(item.href.split("/").pop())}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer text-left border ${
                activeItem === item.href.split("/").pop()
                  ? "bg-gray-900 border-gray-900"
                  : "border-transparent hover:bg-gray-50 hover:border-gray-300"
              } group`}>
              {/* Icon Container */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200 ${
                  activeItem === item.href.split("/").pop()
                    ? "bg-gray-700"
                    : "bg-gray-100 group-hover:bg-gray-200"
                }`}>
                <Image
                  src={item.icon}
                  alt={`${item.label.toLowerCase()}-icon`}
                  width={16}
                  height={16}
                  className={`filter ${
                    activeItem === item.href.split("/").pop()
                      ? "grayscale contrast-0 brightness-200"
                      : "grayscale contrast-125"
                  }`}
                />
              </div>

              {/* Menu Label */}
              <span
                className={`font-medium transition-colors duration-200 ${
                  activeItem === item.href.split("/").pop()
                    ? "text-white"
                    : "text-gray-700 group-hover:text-gray-900"
                }`}>
                {item.label}
              </span>
            </button>
          </Link>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">Admin Access</p>
      </div>
    </div>
  );
};

export default Sidebar;
