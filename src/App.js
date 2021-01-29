import React, { useState, useEffect } from 'react';
import './App.css';

import RecipeCard from './Components/Recipe/Recipe';

function App() {

  const APP_ID = 1;

  const [ recipes, setRecipes ] = useState([]);
  const [ search, setSearch ] = useState('');
  const [ query, setQuery ] = useState('Margarita');
  const [ searchType, setSearchType ] = useState(`https://www.thecocktaildb.com/api/json/v1/${APP_ID}/search.php?s=${query}`);

  const searchByAlc = `https://www.thecocktaildb.com/api/json/v1/${APP_ID}/filter.php?i=${query}`;

  const getCocktails = async() => {
    const response = await fetch(searchType);
    const data = await response.json();
    console.log(data.drinks)
    setRecipes(data.drinks)
  }

  useEffect(() => {
    getCocktails();
  }, [query])

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  const checkbox = () => {
    setSearchType(searchByAlc)
  }

  return (
    <div className="App">
      <h1>Noels Cocktail App</h1>
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar' type='text' value={search} onChange={updateSearch} />
        <button className='search-button' type='submit'>Search</button>
        <input type='checkbox' onChange={checkbox}/>
        <p>Search by Alcohol</p>
      </form>

      <div className='recipe'>
        {recipes.map(recipe => (
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
             />
            
        ))}
      </div>

    </div>
  );
}

export default App;
