import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks, GiBowlOfRice } from "react-icons/gi";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

import React from "react";

function Category() {
  return (
    <motion.div animate={{opacity:1}} initial={{opacity:0}} exit={{opacity:0}} transition={{duration: 0.5}}>

    <div className="categoryList">
      <NavLink className={({ isActive }) => (isActive ? "navLink navLink-active" : "navLink")} to={"/cuisine/italian"}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? "navLink navLink-active" : "navLink")} to={"/cuisine/indian"}>
        <GiBowlOfRice />
        <h4>Indian</h4>
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
    </motion.div>
  );
}

export default Category;
