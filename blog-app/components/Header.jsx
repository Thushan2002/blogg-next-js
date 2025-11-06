"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathName = usePathname();
  const currentPath = pathName.split("/").filter(Boolean).pop() || "";

  return (
    <div className="my-3">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image
            src={assets.logo}
            className="w-[130px] sm:w-auto flex"
            alt="logo"
          />
        </Link>
        <button className="py-3 px-2 bg-black text-white rounded-md hover:scale-[.95]">
          Get Started
        </button>
      </div>
      {/* heading */}
      {!currentPath && (
        <>
          <div className="text-center my-10">
            <h4 className="text-3xl lg:text-5xl font-semibold">Latest Blogs</h4>
            <p className="my-8 max-w-[750px] mx-auto text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium quae inventore quod, ea possimus laboriosam veniam,
              iusto minus minima, similique ad! Est amet voluptates tenetur?
            </p>
          </div>
          {/* subscription form */}
          <form className="flex justify-center pb-7">
            <input
              className="border-2 border-black py-2 px-5 shadow-[0px_0px_8px_2px_black] outline-none"
              type="email"
              name=""
              id=""
              placeholder="Enter your Email"
            />
            <button className="border-2 bg-black text-white border-black outline-none p-2  shadow-[0px_0px_8px_2px_black] active:scale-95">
              Subscribe
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Header;
