import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

function Recipe() {
  const [details, setDetails] = useState({});
  const [activeT, setActiveT] = useState("instructions");
  const [fav,setFav] = useState(false);

  let params = useParams();

  useEffect(() => {
    fetchDetails(params.name);
  }, [params.name]);

  const fetchDetails = async (name) => {
    const check = sessionStorage.getItem(name);
    if (check) {
      setDetails(JSON.parse(check));
    } else {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );

      const recipe = await data.json();
      setDetails(recipe);
      console.log(recipe);
      //adding fetched api item to local storage of browser
      sessionStorage.setItem(name, JSON.stringify(recipe));
    }
  };

  const addfav = () => {
    let check = JSON.parse(sessionStorage.getItem(params.name));
    check.favorite = true;
    var favor = localStorage.getItem('favorite');
    if (favor) {
      var favs =  JSON.parse(favor);
      favs = [...favs, check]
      localStorage.setItem('favorite', JSON.stringify(favs));
    }
    else{
      const arr = [check]
      localStorage.setItem('favorite', [JSON.stringify(arr)]);
    }
    console.log(check);
    setFav(!fav);
  }; 
  
  const remfav = () => {
    const favor = JSON.parse(localStorage.getItem('favorite'));
    favor.splice(favor.findIndex(e => (e.id).toString() === (params.name).toString()) , 1)
    console.log(favor)
    localStorage.setItem('favorite', JSON.stringify(favor))
    setFav(!fav);
  };

  const favorite = () => {
    const check = JSON.parse(localStorage.getItem('favorite'));
    if (check && check.filter(e => (e.id).toString() === (params.name).toString()).length > 0) {
      return (
        <button
          className="detailButton active"
          onClick={() => {
            remfav();
          }}
        >
          Remove from Favorites
        </button>
      );
    } else {
      return (
        <button
          className="detailButton"
          onClick={() => {
            addfav();
          }}
        >
          Add to Favorites
        </button>
      );
    }
  };

  return (
    <>
      <div className="col-12 col-lg-6">
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="row">
            <div className="col-12 center">
              <h2>{details.title}</h2>
            </div>
            <div className="col-12 center">
              <img
                src={details.image}
                className="img-fluid recipeImg"
                alt="details.id"
              ></img>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="col-12 col-lg-6">
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-8 offset-2 col-lg-4 offset-lg-0">
                  <button
                    onClick={() => {
                      setActiveT("summary");
                    }}
                    className={
                      activeT === "summary"
                        ? " detailButton active"
                        : "detailButton"
                    }
                  >
                    Summary
                  </button>
                </div>
                <div className="col-8 offset-2 col-lg-4 offset-lg-0">
                  <button
                    onClick={() => {
                      setActiveT("instructions");
                    }}
                    className={
                      activeT === "instructions"
                        ? " detailButton active"
                        : "detailButton"
                    }
                  >
                    Instructions
                  </button>
                </div>
                <div className="col-8 offset-2 col-lg-4 offset-lg-0">
                  <button
                    onClick={() => {
                      setActiveT("ingredients");
                    }}
                    className={
                      activeT === "ingredients"
                        ? " detailButton active"
                        : "detailButton"
                    }
                  >
                    Ingredients
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12">
              {activeT === "summary" && (
                <div>
                  <h6
                    dangerouslySetInnerHTML={{ __html: details.summary }}
                    align="justify"
                  ></h6>
                </div>
              )}
              {activeT === "instructions" && (
                <div>
                  <h6
                    dangerouslySetInnerHTML={{ __html: details.instructions }}
                    align="justify"
                  ></h6>
                </div>
              )}
              {activeT === "ingredients" && (
                <ul>
                  {details.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="col-12 " id='favButton'>{favorite()}</div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Recipe;
