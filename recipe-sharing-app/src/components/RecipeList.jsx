import React, { useEffect } from "react";
import useRecipeStore from "../components/recipeStore";

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

  return (
    <div>
      <input
        type="text"
        placeholder="Search for recipes..."
        onChange={handleSearchChange}
      />
      <div>
        {(filteredRecipes.length > 0 ? filteredRecipes : recipes).map(
          (recipe) => (
            <div key={recipe.id}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RecipeList;
