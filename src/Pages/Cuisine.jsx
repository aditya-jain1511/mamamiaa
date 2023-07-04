import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const [hasMoreD, setHasMoreD] = useState(true);

  let params = useParams();
  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  const getCuisine = async (type) => {
    const check = sessionStorage.getItem(type + "cuisine");
    if (check) {
      setCuisine(JSON.parse(check));
    } else {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=642b89fe5cf64cb7b5da7a6c57b6eab4&cuisine=${type}`
      );

      const recipe = await data.json();
      setCuisine(recipe.results);
      console.log(recipe);
      //adding fetched api item to local storage of browser
      sessionStorage.setItem(type + "cuisine", JSON.stringify(recipe.results));
    }
  };

  const addDishes = async () => {
    const check = sessionStorage.getItem(params.type + "cuisine");
    var offset = JSON.parse(check).length;
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=642b89fe5cf64cb7b5da7a6c57b6eab4&cuisine=${params.type}&offset=${offset}`
    );
    const recipe = await data.json();
    if (offset >= recipe.totalResults) {
      setHasMoreD(false);
    } else {
      setTimeout(() => {
        var all = [...cuisine, ...recipe.results];
        console.log(all);
        setCuisine((cuisine) => [...cuisine, ...recipe.results]);
        sessionStorage.setItem(params.type + "cuisine", JSON.stringify(all));
      }, 2000);
    }
  };

  const cuisines = cuisine.map((item) => {
    return (
      <div className="gridCard" key={item.id + new Date().getTime()}>
        <Link to={"/recipe/" + item.id}>
          <img src={item.image} alt={item.title}></img>
          <h4>{item.title}</h4>
        </Link>
      </div>
    );
  });

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <InfiniteScroll
        dataLength={
          JSON.parse(sessionStorage.getItem(params.type + "cuisine"))
            ? JSON.parse(sessionStorage.getItem(params.type + "cuisine")).length
            : 0
        }
        next={addDishes}
        hasMore={hasMoreD}
        loader={
          <div className="col-12" style={{ textAlign: "center" }}>
            <div className="spinner-grow text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>

            <div className="spinner-grow text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
        endMessage={
          <div className="col-12" style={{ textAlign: "center" }}>
            <h5>You have Seen it all!!</h5>
          </div>
        }
      >
        <div className="grid">{cuisines}</div>
      </InfiniteScroll>
      <div className="col-12" style={{ textAlign: "center" }}>
        <button onClick={addDishes}>
          In case failed to load, Click to Add dishes
        </button>
      </div>
    </motion.div>
  );
}

export default Cuisine;
