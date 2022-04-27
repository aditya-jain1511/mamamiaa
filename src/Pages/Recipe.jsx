import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

function Recipe() {

  const [details,setDetails] = useState({})
  const [activeT, setActiveT] = useState('summary')

  let params = useParams();

  useEffect(()=>{
    fetchDetails();
  },[params.name])


  const fetchDetails = async() => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)

    const recipe = await data.json();
    setDetails(recipe)
    console.log(recipe)
  }

  return (
    <div className='detailWrap'>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt='details.id'></img>
      </div>
      <div className='detailInfo'>
        <button onClick={()=>{setActiveT('summary')}} className={activeT==='summary'? ' detailButton active' : 'detailButton'}>Summary</button>
        <button onClick={()=>{setActiveT('instructions')}} className={activeT==='instructions'? ' detailButton active' : 'detailButton'}>Instructions</button>
        <button onClick={()=>{setActiveT('ingredients')}} className={activeT==='ingredients'? ' detailButton active' : 'detailButton'}>Ingredients</button>

        {activeT === "summary" && (
          <div>
            <h3 dangerouslySetInnerHTML={{__html:details.summary}}></h3>
          </div>
        )}
        {activeT === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{__html:details.instructions}}></h3>
          </div>
        )}
        {activeT === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient)=>(
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Recipe