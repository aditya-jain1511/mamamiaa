import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useParams } from "react-router-dom";

function Searched() {
  const [searchedR, setSearchedR] = useState([]);

  let params = useParams();

  useEffect(() => {
    getSearchedR(params.search);
    console.log(params);
  }, [params.search]);

  const getSearchedR = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&number=10`
    );
    const recipes = await data.json();

    setSearchedR(recipes.results);
    console.log(recipes)
  };

  const searches = searchedR.map((item)=>{
      return(
          <div className="gridCard" key={item.id}>
              <img src={item.image} alt={item.title}></img>
              <h4>{item.title}</h4>
          </div>
      )
  })

  return (
    <div className="grid">
        {searches}
    </div>
    );
}

export default Searched;
