import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";
import img from "./img.jpg";
import Navbar from "./Navbar";
const App = () => {
  const APP_ID = "255eb759";
  const APP_KEY = "9b1bdb55780030aedefec86b6e9edb65";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState([]);

  useEffect(() => {
    getRecipes();
  }, [query]);

  const exampleReq = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const getRecipes = async () => {
    const data = await (await fetch(exampleReq)).json();
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  return (
    <div className="App">
      <br />
      <br />
      <Navbar />
      <br />
      <img src={img} alt="" className="" />
      <form onSubmit={getSearch}>
        {" "}
        <input
          className="form-control"
          placeholder="Search for a recipe"
          aria-label="Search for a recipe"
          aria-describedby="basic-addon2"
          type="text"
          value={search}
          onChange={updateSearch}
        />{" "}
        <br />
        <button type="submit" className="btn btn-outline-secondary">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => {
          return (
            <Recipe
              title={recipe.recipe.label}
              calories={Math.ceil(recipe.recipe.calories)}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
