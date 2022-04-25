import React, { useEffect, useState } from "react";

export default function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
    );
    const data = await api.json();
    console.log(data.recipes);

    setPopular(data.recipes);
  };

  const popularDishes = popular.map((recipe) => {
    return (
      <div className="popular" key={recipe.id}>
        <div className="popCard">
          <p>{recipe.title}</p>
          <img src={recipe.image} alt="{recipe.title}"></img>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h3>Popular Picks:</h3>
      {popularDishes}
    </div>
  );
}
