import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    //adding fetched api call to local storage so we dont have to fetch it again and again from spoonacular if already present in browser cache

    // checking for items in local storage
    const check = localStorage.getItem('popular')
    if (check){
      setPopular(JSON.parse(check))
    }
    else{
      const api = await fetch( `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);

      const data = await api.json();
      //adding fetched api item to local storage of browser 
      localStorage.setItem('popular',JSON.stringify(data.recipes))
      setPopular(data.recipes);
      console.log(data.recipes);    
    }
  };

  const popularDishes = popular.map((recipe) => {
    return (
      <SplideSlide key={recipe.id}>
          <div className="popCard">
            <Link to={'/recipe/'+recipe.id}>
              <p className="popTitle">{recipe.title}</p>
              <img className="popImg" src={recipe.image} alt="{recipe.title}"></img>
              <div className="gradient"></div>
            </Link>
          </div>
      </SplideSlide>
    );
  });

  return (
    <motion.div animate={{opacity:1}} initial={{opacity:0}} exit={{opacity:0}} transition={{duration: 0.5}}>

    <div className="popular" >
      <h3>Popular Picks:</h3>
      <Splide options={{
        perPage: 4,
        arrows: false,
        pagination: false,
        drag: 'free',
        gap: '2rem'
      }}>
        {popularDishes}
      </Splide>
    </div>
    </motion.div>
  );
}
