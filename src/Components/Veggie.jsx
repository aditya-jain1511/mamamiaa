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
      const api = await fetch( `https://api.spoonacular.com/recipes/random?apiKey=642b89fe5cf64cb7b5da7a6c57b6eab4&number=10&tags=lacto-vegetarian`);

      const data = await api.json();
      //adding fetched api item to local storage of browser 
      sessionStorage.setItem('veggiepicks',JSON.stringify(data.recipes))
      setVeggie(data.recipes);
      console.log(data.recipes);    
    }
  };

  const veggieDishes = veggie.map((recipe) => {
    return (
      <SplideSlide key={recipe.id + new Date().getTime()}>
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
      <h6>(Our Eggless Picks)</h6>
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
        <SplideSlide>
          <Link to={'/seemore/&number=10&tags=lacto-vegetarian/veggiepicks'}>
            <div className="homeCard seeMore">
              <p className="seeMoreTitle">See More</p>
            </div>
            </Link>
          </SplideSlide>
      </Splide>
    </div>
    </motion.div>
  );
}
