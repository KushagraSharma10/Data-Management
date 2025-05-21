import React, { useState } from 'react';
import axios from 'axios';

const TagForm = () => {
  const [tagName, setTagName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tagName.trim()) {
      setMessage('Tag name cannot be empty.');
      return;
    }

    try {
      const response = await axios.post('/tags', { name: tagName });
      setMessage(`Tag "${response.data.name}" created successfully!`);
      setTagName('');
    } catch (error) {
      console.error(error);
      setMessage('Error creating tag. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Create a Tag</h2>

        <input
          type="text"
          placeholder="Enter tag name"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Create
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
};

export default TagForm;
