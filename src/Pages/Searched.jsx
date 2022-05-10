import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

function Searched() {
  const [searchedR, setSearchedR] = useState([]);
  const [hasMoreD, setHasMoreD] = useState(true);

  let params = useParams();

  useEffect(() => {
    getSearchedR(params.search);
  }, [params.search]);

  const getSearchedR = async (name) => {
    const check = sessionStorage.getItem("Search" + name);
    if (check) {
      setSearchedR(JSON.parse(check));
    } else {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&number=10`
      );

      const recipe = await data.json();
      setSearchedR(recipe.results);
      console.log(recipe);
      //adding fetched api item to local storage of browser
      sessionStorage.setItem("Search" + name, JSON.stringify(recipe.results));
    }
  };

  const addDishes = async () => {
    const check = sessionStorage.getItem("Search" + params.search);
    var offset = JSON.parse(check).length;
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${params.search}&number=10&offset=${offset}`
    );
    const recipe = await data.json();
    if (offset >= recipe.totalResults) {
      setHasMoreD(false);
    } else {
      setTimeout(() => {
        var all = [...searchedR, ...recipe.results];
        console.log(all);
        setSearchedR((searchedR) => [...searchedR, ...recipe.results]);
        sessionStorage.setItem("Search" + params.search, JSON.stringify(all));
      }, 2000);
    }
  };

  const searches = searchedR.map((item) => {
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
          JSON.parse(sessionStorage.getItem("Search" + params.search))
            ? JSON.parse(sessionStorage.getItem("Search" + params.search)).length
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
        <div className="grid">{searches}</div>
      </InfiniteScroll>
      <div className="col-12" style={{ textAlign: "center" }}>
        <button onClick={addDishes}>
          In case failed to load, Click to Add dishes
        </button>
      </div>
    </motion.div>
  );
}

export default Searched;
