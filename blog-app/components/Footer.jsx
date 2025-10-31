import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black p-4 flex flex-col sm:flex-row sm:gap-4  justify-between items-center">
      <Image src={assets.logo_light} alt="Logo" width={120} />
      <p className="text-white">All rights reserved. Copyright @blogger</p>
      <div className="flex items-center">
        <Image src={assets.facebook_icon} alt="facebook_icon" width={50} />
        <Image src={assets.twitter_icon} alt="twitter_icon" width={50} />
        <Image src={assets.googleplus_icon} alt="googleplus_icon" width={50} />
      </div>
    </footer>
  );
};

export default Footer;
