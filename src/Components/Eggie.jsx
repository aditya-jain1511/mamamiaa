import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Eggie() {
  const [eggie, setEggie] = useState([]);

  useEffect(() => {
    getEggie();
  }, []);

  const getEggie = async () => {
    //adding fetched api call to local storage so we dont have to fetch it again and again from spoonacular if already present in browser cache

    // checking for items in local storage
    const check = sessionStorage.getItem('eggiepicks')
    if (check){
      setEggie(JSON.parse(check))
    }
    else{
      const api = await fetch( `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10&tags=vegetarian`);

      const data = await api.json();
      //adding fetched api item to local storage of browser 
      sessionStorage.setItem('eggiepicks',JSON.stringify(data.recipes))
      setEggie(data.recipes);
      console.log(data.recipes);    
    }
  };

  const eggieDishes = eggie.map((recipe) => {
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
      <h3>Our Vegetarian Picks: </h3>
      <h6>(may contain eggs)</h6>
      <Splide options={{
        perPage: 5,  
        arrows: true,
        pagination: false,
        drag: 'free',
        gap: '2rem',
        breakpoints: {
          1920:{
            perPage: 4,
          },
          1280: {
            perPage: 2,
          },
          640:{
            perPage: 1,
          }
        }
      }}>
        {eggieDishes}
      </Splide>
    </div>
    </motion.div>
  );
}
