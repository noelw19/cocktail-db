import React, { useState, useEffect } from "react";
import "./App.css";

import RecipeCard from "./Components/Recipe/Recipe";

function App() {
  const APP_ID = 1;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("vodka");
  const [isLoading, setIsLoading] = useState(false);
  //will be set to true if ingredient search yields a value
  const [ingredientBoolean, setIngredientBoolean] = useState(false);
  const [ingredientSearch, setIngredientSearch] = useState([]);
  const [queried, setQueried] = useState(false);
  const [prevSate, setPrevState] = useState();


  //prev state State so that i can revert back to prevstate when i am done looking at the single card

  useEffect(() => {
    const searchBySpirit = `https://www.thecocktaildb.com/api/json/v1/${APP_ID}/search.php?s=${query}`;
    const searchByIngredient = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`;

    const getCocktails = async () => {
      setIsLoading(true);
      const response = await fetch(searchBySpirit);
      const data = await response.json();
      setRecipes(data.drinks);
      setIsLoading(false);
    };

    const getCocktailByIngredient = async () => {
      const response = await fetch(searchByIngredient);
      const data = await response.json();
      if(data) {
        setIngredientSearch(data.drinks);
        setIngredientBoolean(true);
        setIsLoading(false);
      }else if(!data){
        setIngredientSearch(recipes);
        setQueried(true);
        setIsLoading(false);
      }

    };

    function cocktailByNameChecker() {
      if(recipes.length >= 1 || recipes.length === 1) {
          setQueried(true);
          setIsLoading(false);
          setIngredientBoolean(false);

      }
    }
  


    getCocktails();
    getCocktailByIngredient();
    cocktailByNameChecker();
  }, [query, recipes.length]);



  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  //single view function to run when see more button is clicked
  const singleView = (newState) => {

    setIngredientBoolean(false);
    setPrevState(query);
    setQuery(newState); 
    setIngredientBoolean(false);
    setQueried(true);
  }

  //go back function to run on the go back button
  const goBack = () => {
    setIngredientBoolean(true);
    setQuery(prevSate);
    setPrevState('');
    setQueried(false);
  }

  //function to return the html for single view
  const viewSingle = (arg) => {
    return (
      <div>
        {isLoading ? <h1>Loading</h1> : <div className='single'><h2>Cocktails with '{query}' in the name.</h2>{queried && <div className="recipe">
        {arg.map((recipe) => (
          <RecipeCard
            key={recipe.idDrink}
            title={recipe.strDrink}
            image={recipe.strDrinkThumb}
            method={recipe.strInstructions}
            ing1={recipe.strIngredient1}
            ing2={recipe.strIngredient2}
            ing3={recipe.strIngredient3}
            ing4={recipe.strIngredient4}
            ing5={recipe.strIngredient5}
            ing6={recipe.strIngredient6}
            ing7={recipe.strIngredient7}
            ing8={recipe.strIngredient8}
            ing9={recipe.strIngredient9}
            ing10={recipe.strIngredient10}
            msr1={recipe.strMeasure1}
            msr2={recipe.strMeasure2}
            msr3={recipe.strMeasure3}
            msr4={recipe.strMeasure4}
            msr5={recipe.strMeasure5}
            msr6={recipe.strMeasure6}
            btn={() =>  goBack()}
            btnText='Go Back'
          />
        ))}
        </div>} </div>}
      </div>
    )
  }

  //function that returns html layout for the all the api responses
  const searchAndRenderAll = () => {
    return (
      <div>
          {!isLoading && <div>{ingredientBoolean && <div className='single'>
          <h2 className='byIngred'>Cocktails with {query} in the ingredients list.</h2>
          <div className='recipe ' >
          {ingredientSearch.slice(0, 14).map((recipe) => (
          <RecipeCard 
            key={recipe.idDrink}
            title={recipe.strDrink}
            image={recipe.strDrinkThumb}
            btn={() => singleView(recipe.strDrink)}
            btnText='See More' />
        ))}</div> 
      </div>} 
    </ div>}
  </div>
    )
  }

  //function to check if the search value is strictly equal to a data.drinks.strDrink
  //maybe using forEach to check each cocktail object within the recipe state

  function scrollToIngredients() {
    const element = document.querySelector('.byIngred');
    element.scrollIntoView();
  }
  
  console.log(recipes);
  return (
    <div className="App">
      <h1>SEARCH COCKTAIL RECIPES</h1>
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {!isLoading && <div className='scrollBtnContainer' >{ingredientBoolean && <button className='scroll' onClick={scrollToIngredients}>Cocktails including {query}</button>}</div>}
        {!recipes ? <h2>No results for the search '{query}'</h2> : <>
          
          {recipes.length >= 1 && viewSingle(recipes)}
          {searchAndRenderAll()}
        </>}

    </div>
  );
}

export default App;
