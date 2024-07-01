import React from "react";

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="text-gray-600 body-font fixed top-0 w-full bg-white">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <p className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none" 
            stroke="currentColor"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          > 
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl cursor-pointer">Todo-App</span>
        </p>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <p className="mr-5 hover:text-gray-900 cursor-pointer">Home</p>
          <p className="mr-5 hover:text-gray-900 cursor-pointer">Blog</p>
          <p className="mr-5 hover:text-gray-900 cursor-pointer">About Us</p>
          <p className="mr-5 hover:text-gray-900 cursor-pointer">Contact </p>
        </nav>
        <Link to="/login" className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 me-5">
          Login 
        </Link>
        <Link to="/signup" className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Signup 
        </Link>
      </div>
    </header>
  )
}
