import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../Components/Signup";
import Login from "../Components/Login";
import UsersList from "../Components/UsersList";


const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/userslist" element={<UsersList/>}/>
    </Routes>
  );
};

export default AllRoutes;
