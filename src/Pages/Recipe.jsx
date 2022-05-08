import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

function Recipe() {
  const [details, setDetails] = useState({});
  const [activeT, setActiveT] = useState("instructions");

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
              <img src={details.image} class="img-fluid recipeImg" alt="details.id"></img>
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
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Recipe;
