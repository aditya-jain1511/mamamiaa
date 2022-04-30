import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);

  let params = useParams();

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  const getCuisine = async (type) => {

    const check = sessionStorage.getItem(type+'cuisine')
    if (check){
      setCuisine(JSON.parse(check))
    }
    else{
      const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${type}`)

      const recipe = await data.json();
      setCuisine(recipe.results)
      console.log(recipe)
      //adding fetched api item to local storage of browser 
      sessionStorage.setItem(type+'cuisine',JSON.stringify(recipe.results))
    }
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
