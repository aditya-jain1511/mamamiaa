import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Favorite() {
  const [favorite, setFavorite] = useState([]);
  const [exist, setExist] = useState(false);

  useEffect(() => {
    getFavorite();
  }, []);

  const getFavorite = () => {
    let check = localStorage.getItem("favorite");

    if (check) {
      check = JSON.parse(check);
      if (check.length === 0) {
        console.log(check);
        setExist(false);
      } else {
        console.log(check);
        setExist(true);
        setFavorite(check);
      }
    } else {
      setExist(false);
      console.log(check);
    }
  };

  const favorites = favorite.map((item) => {
    return (
      <div className="gridCard" key={item.id}>
        <Link to={"/recipe/" + item.id}>
          <img src={item.image} alt={item.title}></img>
          <h4>{item.title}</h4>
        </Link>
      </div>
    );
  });

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid">
        {exist === true && favorites}
        {exist === false && (
          <div className="col-12">
            <h4>You dont have any favorites</h4>
            <div>How to add Favorites</div>
            <ul>
                <li>Click on a recipe image to go to it's details</li>
                <li>Click on add to favourites button</li>
            </ul>
            <a href="/home">Home</a> ← Click here to go to home page
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Favorite;
