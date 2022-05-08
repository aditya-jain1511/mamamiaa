import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks, GiBowlOfRice } from "react-icons/gi";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

import React from "react";

function Category() {

  const links = () =>{
    return(
      <div className="categoryList">
        <NavLink className={({ isActive }) => (isActive ? "catLink active" : "catLink")} to={"/cuisine/italian"}>
          <FaPizzaSlice />
          <h4>Italian</h4>
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "catLink active" : "catLink")} to={"/cuisine/indian"}>
          <GiBowlOfRice />
          <h4>Indian</h4>
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "catLink active" : "catLink")} to={"/cuisine/american"}>
          <FaHamburger />
          <h4>American</h4>
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "catLink active" : "catLink")} to={"/cuisine/thai"}>
          <GiNoodles />
          <h4>Thai</h4>
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "catLink active" : "catLink")} to={"/cuisine/japanese"}>
          <GiChopsticks />
          <h4>Japanese</h4>
        </NavLink>
      </div>
    )
  }

  const links2 = ()=>{
    return(
      <>
        <div className="row justify-content-around align-items-center">
          <div className="col-3 catlink2">
            <NavLink className={({ isActive }) => (isActive ? "catLink active" : "catLink")} to={"/cuisine/italian"}>
              <FaPizzaSlice />
              <h4>Italian</h4>
            </NavLink>
          </div>
          <div className="col-3 catlink2">
            <NavLink className={({ isActive }) => (isActive ? "catLink active" : "catLink")} to={"/cuisine/indian"}>
              <GiBowlOfRice />
              <h4>Indian</h4>
            </NavLink>
          </div>
          <div className="col-3 catlink2">
            <NavLink className={({ isActive }) => (isActive ? "catLink active" : "catLink")} to={"/cuisine/american"}>
              <FaHamburger />
              <h4>American</h4>
            </NavLink>
          </div>
        </div>
        <div className="row justify-content-evenly align-items-center catlink2">
          <div className="col-3 catlink2">
            <NavLink className={({ isActive }) => (isActive ? "catLink active" : "catLink")} to={"/cuisine/thai"}>
              <GiNoodles />
              <h4>Thai</h4>
            </NavLink>
          </div>
          <div className="col-3 catlink2">
            <NavLink className={({ isActive }) => (isActive ? "catLink active" : "catLink")} to={"/cuisine/japanese"}>
              <GiChopsticks />
              <h4>Japanese</h4>
            </NavLink>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <motion.div animate={{opacity:1}} initial={{opacity:0}} exit={{opacity:0}} transition={{duration: 0.5}} className="col-12 col-md-6 offset-md-3 d-none d-md-block">
        {links()}
      </motion.div>
      <div className="col-md-3 d-none d-md-block"></div>
      <motion.div animate={{opacity:1}} initial={{opacity:0}} exit={{opacity:0}} transition={{duration: 0.5}} className="col-12 col-sm-8 offset-sm-2 d-md-none">
        {links2()}
      </motion.div>
      <div className="col-sm-2 d-md-none"></div>
    </>
  );
}

export default Category;
