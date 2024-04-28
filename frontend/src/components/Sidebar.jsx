import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar w-48 bg-gradient-to-r from-gray-500 to-gray-200 shadow-md p-4">
      <ul>
        <Link to="/department">
          <li className="font-semibold hover:font-bold mb-24 cursor-pointer">
            Departments
          </li>
        </Link>
        <Link to="/project">
          <li className="font-semibold hover:font-bold mb-24 cursor-pointer">
            Projects
          </li>
        </Link>
        <Link to="/employee">
          <li className="font-semibold hover:font-bold mb-24 cursor-pointer">
            Employee List
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
