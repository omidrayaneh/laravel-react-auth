import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="hidden lg:block w-64 bg-gray-800 text-white">
      <ul className="py-4">
        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
        <Link to='/dashboard'>Darshboard</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
          <Link to='/users'>Users</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
