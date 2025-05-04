import React from "react";
import { IoIosSearch } from "react-icons/io";

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
      <div className="relative search w-full bg-white text-md rounded-lg">
        <input
          className="w-full border-grey-100 outline-none p-3 px-6 rounded-lg active:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out "
          type="search"
          placeholder="Search..."
          onChange={handleSearch}
          value={searchQuery}

        />
        <IoIosSearch className="search-icon w-7 h-7 absolute right-2 top-3" />
      </div>
      
      <a
        href="/user/create"
        className="btn  px-5 whitespace-nowrap py-3 text-[1em] font-semibold tracking-tight bg-linear-90 bg-green-500 rounded-md text-white"
      >
        Add User
      </a>
    </div>
  );
};

export default Header;
