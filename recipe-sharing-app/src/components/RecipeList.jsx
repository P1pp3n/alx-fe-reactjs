import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // Link import
import  useRecipeStore  from "../components/recipeStore";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term
    filterRecipes(); // Filter the recipes based on the search term
  };

  useEffect(() => {
    filterRecipes(); // Filter recipes whenever the component mounts or updates
  }, [recipes]); // Re-run when the recipes list changes

  // Ensure filteredRecipes is always an array
  const recipesToDisplay =
    filteredRecipes && filteredRecipes.length > 0 ? filteredRecipes : recipes;

  return (
    <div>
      <input
        type="text"
        placeholder="Search for recipes..."
        onChange={handleSearchChange}
      />
      <div>
        {recipesToDisplay.length > 0 ? (
          recipesToDisplay.map((recipe) => (
            <div key={recipe.id}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              {/* Link to navigate to the recipe details page */}
              <Link to={`/recipe/${recipe.id}`}>View Recipe</Link>
            </div>
          ))
        ) : (
          <p>No recipes found.</p> // Optional message for empty recipe list
        )}
      </div>
    </div>
  );
};

export default RecipeList;
