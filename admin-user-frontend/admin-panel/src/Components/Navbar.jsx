import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const links = [
    { title: "Signup", path: "/signup" },
    // { title: "Login", path: "/login" },
    { title: "UsersList", path: "/userslist" },
  ];

  return (
    <div>
      <div className="flex justify-around bg-blue-500 underline">
        {links.map((elem) => (
          <Link className="text-white" key={elem.path} to={elem.path}>
            {elem.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
