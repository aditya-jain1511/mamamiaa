import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, NavLink, useParams } from "react-router-dom";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);

  let params = useParams();

  useEffect(() => {
    getCuisine(params.type);
    console.log(params);
  }, [params.type]);

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );
    const recipes = await data.json();

    setCuisine(recipes.results);
  };

  const cuisines = cuisine.map((item)=>{
      return(
          <div className="gridCard" key={item.id}>
            <Link to={'/recipe/'+ item.id}>
              <img src={item.image} alt={item.title}></img>
              <h4>{item.title}</h4>
            </Link>
          </div>
      )
  })

  return (
    <motion.div animate={{opacity:1}} initial={{opacity:0}} exit={{opacity:0}} transition={{duration: 0.5}}  >
        <div className="grid">
          {cuisines}
        </div>
    </motion.div>
    );
}

export default Cuisine;
