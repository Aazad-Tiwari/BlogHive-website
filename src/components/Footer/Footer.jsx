import React from "react";
import Logo from "../Logo";
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";

function Footer() {
  return (
    <section className="relative overflow-hidden w-full bg-white flex flex-col items-center justify-center gap-8 mx-auto font-roboto">

    <div className="flex items-center justify-center gap-6">
      <Logo height='h-24' />
      <h1 className="text-black text-4xl font-bold font-roboto" >BloggHive</h1>
    </div>

    <div>
      <ul className="flex items-center justify-center gap-8 xsm:gap-20">
        <li className="text-black hover:text-blog_blue "> <Link to='/' >Home</Link> </li>
        <li className="text-black hover:text-blog_blue "><Link to='/all-posts' >Blogs</Link></li>
        <li className="text-black hover:text-blog_blue "><Link to='/add-post' >Add</Link></li>
        <li className="text-black hover:text-blog_blue "><Link to='/add-post' >Contact</Link></li>
      </ul>
    </div>
    <div>
      <ul className="flex items-center justify-center gap-10">
        <li className="bg-blog_blue rounded-full p-2 text-white font-bold"><a href="">LN</a></li>
        <li className="bg-blog_blue rounded-full p-2 text-white font-bold"><a href="">IG</a></li>
        <li className="bg-blog_blue rounded-full p-2 text-white font-bold"><a href="">FB</a></li>
        <li className="bg-blog_blue rounded-full p-2 text-white font-bold"><a href="">X</a></li>
      </ul>
    </div>

    <div className="w-[1250px] h-[2px] mx-auto bg-blog_blue"></div>
      
    <div className="text-center">
      <p>&copy; Copyright 2024. All Rights Reserved by DevUI.</p>
    </div>

    </section>
  );
}

export default Footer;
