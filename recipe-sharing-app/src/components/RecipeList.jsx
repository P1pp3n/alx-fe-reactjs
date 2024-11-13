import React, { useEffect } from "react";
import useRecipeStore  from "../components/recipeStore"; // Ensure correct import path

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.filteredRecipes); // Get filtered recipes from store
  const loadRecipes = useRecipeStore((state) => state.loadRecipes); // Action to load recipes
  const recipesFromStore = useRecipeStore((state) => state.recipes);

  // Load initial recipes if the store is empty
  useEffect(() => {
    if (recipesFromStore.length === 0) {
      loadRecipes([
        {
          id: 1,
          title: "Spaghetti Bolognese",
          description: "Classic Italian dish",
        },
        { id: 2, title: "Chicken Curry", description: "Spicy and flavorful" },
        { id: 3, title: "Pancakes", description: "Fluffy breakfast treat" },
      ]);
    }
  }, [recipesFromStore, loadRecipes]);

  return (
    <div>
      {recipes.length === 0 ? (
        <p>No recipes found. Try another search term.</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
