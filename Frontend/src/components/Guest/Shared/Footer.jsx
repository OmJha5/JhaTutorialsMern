import React from "react";

export default function Footer() {
  return (
    <footer className="mt-8 py-4 border-t border-gray-300 bg-gray-100 text-center">
      <h2 className="text-gray-600 text-sm sm:text-base">
        &copy; {new Date().getFullYear()} All Rights Reserved.
      </h2>
    </footer>
  );
}
