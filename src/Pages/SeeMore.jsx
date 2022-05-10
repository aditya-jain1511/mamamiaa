import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

function SeeMore() {
  const [searchedR, setSearchedR] = useState([]);
  const [hasMoreD, setHasMoreD] = useState(true);

  let params = useParams();

  useEffect(() => {
    getSearchedR(params.tag,params.session);
  }, [params.tag, params.session]);

  const getSearchedR = async (tags,session) => {
    const check = sessionStorage.getItem(session);
    if (check) {
      setSearchedR(JSON.parse(check));
    } else {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}${tags}`
      );

      const recipe = await data.json();
      setSearchedR(recipe.recipes);
      console.log(recipe);
      //adding fetched api item to local storage of browser
      sessionStorage.setItem(session, JSON.stringify(recipe.recipes));
    }
  };

  const addDishes = async () => {
    const check = sessionStorage.getItem(params.session);
    var offset = JSON.parse(check).length;
    const data = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}${params.tag}`
    );
    const recipe = await data.json();
    if (offset >= 200) {
      setHasMoreD(false);
    } else {
      setTimeout(() => {
        var all = [...searchedR, ...recipe.recipes];
        console.log(all);
        setSearchedR((searchedR) => [...searchedR, ...recipe.recipes]);
        sessionStorage.setItem(params.session, JSON.stringify(all));
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
          JSON.parse(sessionStorage.getItem(params.session))
            ? JSON.parse(sessionStorage.getItem(params.session)).length
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

export default SeeMore;
