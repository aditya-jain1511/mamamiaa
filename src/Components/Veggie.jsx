import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from "react-router-dom";

export default function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    //adding fetched api call to local storage so we dont have to fetch it again and again from spoonacular if already present in browser cache

    // checking for items in local storage
    const check = localStorage.getItem('veggie')
    if (check){
      setVeggie(JSON.parse(check))
    }
    else{
      const api = await fetch( `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian&intolerance=egg, `
      );

      const data = await api.json();
      //adding fetched api item to local storage of browser 
      localStorage.setItem('veggie',JSON.stringify(data.recipes))
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
    <div className="veggie" >
      <h3>Our Vegetarian Picks:</h3>
      <Splide options={{
        perPage: 3,
        arrows: false,
        pagination: false,
        drag: 'free',
        gap: '2rem'
      }}>
        {veggieDishes}
      </Splide>
    </div>
  );
}
