import React from 'react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg border border-gray-300 max-w-md">
        <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-500 mb-6">The page you are looking for does not exist.</p>
        <p className="text-sm text-gray-400 mb-4">You can go back to the home page by clicking below.</p>
        <a
          href="/"
          className="text-white bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-6 rounded-md transition duration-300"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
