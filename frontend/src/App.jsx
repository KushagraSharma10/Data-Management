import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
  
      <header className="mb-10 mt-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Data Management
        </h1>
      </header>

  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-20">
     
        <Link
          to="/users"
          className="group block bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Users</h2>
            </div>
            <p className="text-gray-600">Manage all user accounts</p>
          </div>
        </Link>

  
        <Link
          to="/blogs"
          className="group block bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Blogs</h2>
            </div>
            <p className="text-gray-600">Manage all blog posts</p>
          </div>
        </Link>

  
        <Link
          to="/tags"
          className="group block bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Tags</h2>
            </div>
            <p className="text-gray-600">Manage blog tags</p>
          </div>
        </Link>

    
        <Link
          to="/categories"
          className="group block bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-lg bg-orange-100 text-orange-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
            </div>
            <p className="text-gray-600">Manage blog categories</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default App;