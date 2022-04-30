import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

function Searched() {
  const [searchedR, setSearchedR] = useState([]);

  let params = useParams();

  useEffect(() => {
    getSearchedR(params.search);
  }, [params.search]);

  const getSearchedR = async (name) => {

    const check = sessionStorage.getItem(name)
    if (check){
      setSearchedR(JSON.parse(check))
    }
    else{
      const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&number=10`)

      const recipe = await data.json();
      setSearchedR(recipe.results)
      console.log(recipe)
      //adding fetched api item to local storage of browser 
      sessionStorage.setItem(name,JSON.stringify(recipe.results))
    }
  };

  const searches = searchedR.map((item)=>{
      return(
          <div className="gridCard" key={item.id}>
            <Link  to={'/recipe/'+ item.id}>
              <img src={item.image} alt={item.title}></img>
              <h4>{item.title}</h4>
            </Link>
          </div>
      )
  })

  return (
    <motion.div animate={{opacity:1}} initial={{opacity:0}} exit={{opacity:0}} transition={{duration: 0.5}}>
      <div className="grid">
          {searches}
      </div>
    </motion.div>
    );
}

export default Searched;
