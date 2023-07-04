import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

function SeeMore() {
  const [seeMore, setSeeMore] = useState([]);
  const [hasMoreD, setHasMoreD] = useState(true);

  let params = useParams();

  useEffect(() => {
    getSeeMore(params.tag,params.session);
  }, [params.tag, params.session]);

  const getSeeMore = async (tags,session) => {
    const check = sessionStorage.getItem(session +"seemore");
    if (check) {
      setSeeMore(JSON.parse(check));
    } else {
      console.log("rerun")
      const data = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=642b89fe5cf64cb7b5da7a6c57b6eab4${tags}`
      );

      const recipe = await data.json();
      setSeeMore(recipe.recipes);
      console.log(recipe);
      //adding fetched api item to local storage of browser
      sessionStorage.setItem(session +"seemore", JSON.stringify(recipe.recipes));
    }
  };

  const addDishes = async () => {
    const check = sessionStorage.getItem(params.session +"seemore");
    var offset = (JSON.parse(check)?JSON.parse(check).length:0);
    const data = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=642b89fe5cf64cb7b5da7a6c57b6eab4${params.tag}`
    );
    const recipe = await data.json();
    if (offset >= 200) {
      setHasMoreD(false);
    } else {
      setTimeout(() => {
        var all = [...seeMore, ...recipe.recipes];
        console.log(all);
        setSeeMore((seeMore) => [...seeMore, ...recipe.recipes]);
        sessionStorage.setItem(params.session +"seemore", JSON.stringify(all));
      }, 2000);
    }
  };

  const searches = seeMore.map((item) => {
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
          JSON.parse(sessionStorage.getItem(params.session +"seemore"))
            ? JSON.parse(sessionStorage.getItem(params.session +"seemore")).length
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
