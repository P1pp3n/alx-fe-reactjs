import React from "react";
import { useParams } from "react-router-dom"; // To get recipeId from the route
import useRecipeStore from "../components/recipeStore.js"; 
import EditRecipeForm from "./EditRecipeForm.jsx";
import DeleteRecipeButton from "./DeleteRecipeButton.jsx";

const RecipeDetails = () => {
  const { recipeId } = useParams(); // Gets recipeId from the URL
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === parseInt(recipeId))
  );

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      {/* Render EditRecipeForm and DeleteRecipeButton */}
      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={recipe.id} />
    </div>
  );
};

export default RecipeDetails;
