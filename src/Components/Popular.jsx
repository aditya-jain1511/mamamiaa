import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';

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
            <p className="popTitle">{recipe.title}</p>
            <img className="popImg" src={recipe.image} alt="{recipe.title}"></img>
            <div className="gradient"></div>
          </div>
        
      </SplideSlide>
    );
  });

  return (
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
  );
}
