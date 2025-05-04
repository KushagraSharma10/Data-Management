import React from "react";
import { IoIosSearch, IoMdAdd } from "react-icons/io";
import { Link } from "react-router";

const Header = ({searchQuery, setSearchQuery}) => {

  const handleSearch = (e) =>{
    const searchIcon = document.querySelector(".search-icon");
    e.preventDefault();
    const searchTerm = e.target.value;
    searchIcon.style.display = searchTerm ? "none" : "block";
    setSearchQuery(searchTerm);
    console.log(searchTerm);
  }

  return (
    <div className="upper mb-4 flex gap-3 items-center justify-between">
      <div className="relative search w-full shadow-md bg-white text-md rounded-lg">
        <input
          className="w-full  outline-none p-3 px-6 rounded-lg active:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out "
          type="search"
          placeholder="Search..."
          onChange={handleSearch}
          value={searchQuery}

        />
        <IoIosSearch className="search-icon w-7 h-7 absolute right-2 top-3" />
      </div>
      
      <Link to="/user/create"
        href="/user/create"
        className="flex items-center gap-2 px-5 py-3 whitespace-nowrap font-semibold tracking-tight rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:scale-105 hover:shadow-lg transition-all duration-300"
      >
        <IoMdAdd className="text-lg" />
        Add User
      </Link>
    </div>
  );
};

export default Header;
