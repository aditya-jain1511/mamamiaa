import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    //adding fetched api call to local storage so we dont have to fetch it again and again from spoonacular if already present in browser cache

    // checking for items in local storage
    const check = sessionStorage.getItem('veggiepicks')
    if (check){
      setVeggie(JSON.parse(check))
    }
    else{
      const api = await fetch( `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10&tags=lacto-vegetarian`);

      const data = await api.json();
      //adding fetched api item to local storage of browser 
      sessionStorage.setItem('veggiepicks',JSON.stringify(data.recipes))
      setVeggie(data.recipes);
      console.log(data.recipes);    
    }
  };

  const veggieDishes = veggie.map((recipe) => {
    return (
      <SplideSlide key={recipe.id}>
          <div className="vegCard">
            <Link to={'/recipe/'+recipe.id}>
              <p className="vegTitle">{recipe.title}</p>
              <img className="vegImg" src={recipe.image} alt="{recipe.title}"></img>
              <div className="gradient"></div>
            </Link>
          </div>
      </SplideSlide>
    );
  });

  return (
    <motion.div animate={{opacity:1}} initial={{opacity:0}} exit={{opacity:0}} transition={{duration: 0.5}}>

    <div className="veggie" >
      <h3>Our Vegetarian Picks:</h3>
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
        {veggieDishes}
      </Splide>
    </div>
    </motion.div>
  );
}
