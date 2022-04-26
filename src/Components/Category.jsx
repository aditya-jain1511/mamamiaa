import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import { NavLink } from "react-router-dom";

import React from "react";

function Category() {
  return (
    <div className="categoryList">
      <NavLink className={({ isActive }) => (isActive ? "navLink navLink-active" : "navLink")} to={"/cuisine/italian"}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? "navLink navLink-active" : "navLink")} to={"/cuisine/american"}>
        <FaHamburger />
        <h4>American</h4>
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? "navLink navLink-active" : "navLink")} to={"/cuisine/thai"}>
        <GiNoodles />
        <h4>Thai</h4>
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? "navLink navLink-active" : "navLink")} to={"/cuisine/japanese"}>
        <GiChopsticks />
        <h4>Japanese</h4>
      </NavLink>
    </div>
  );
}

export default Category;
