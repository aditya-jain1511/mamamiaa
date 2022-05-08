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
    const check = sessionStorage.getItem('popularpicks')
    if (check){
      setPopular(JSON.parse(check))
    }
    else{
      const api = await fetch( `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);

      const data = await api.json();
      //adding fetched api item to local storage of browser 
      sessionStorage.setItem('popularpicks',JSON.stringify(data.recipes))
      setPopular(data.recipes);
      console.log(data.recipes);    
    }
  };

  const popularDishes = popular.map((recipe) => {
    return (
      <SplideSlide key={recipe.id}>
          <div className="homeCard">
            <Link to={'/recipe/'+recipe.id}>
              <p className="homeTitle">{recipe.title}</p>
              <img className="homeImg" src={recipe.image} alt="{recipe.title}"></img>
              <div className="gradient"></div>
            </Link>
          </div>
      </SplideSlide>
    );
  });

  return (
    <motion.div animate={{opacity:1}} initial={{opacity:0}} exit={{opacity:0}} transition={{duration: 0.5}}>

    <div className="home" >
      <h3>Popular Picks:</h3>
      <Splide options={{
        perPage: 4,
        arrows: true,
        pagination: false,
        drag: 'free',
        gap: '2rem',
        breakpoints: {
          1920:{
            perPage: 3,
          },
          1280: {
            perPage: 2,
          },
          640:{
            perPage: 1,
          }
        }
      }}>
        {popularDishes}
      </Splide>
    </div>
    </motion.div>
  );
}
