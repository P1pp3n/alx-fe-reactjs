import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useRecipeStore from "../components/recipeStore.js";

const DeleteRecipeButton = ({ recipeId }) => {
  const navigate = useNavigate(); // Initialize navigate
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    deleteRecipe(recipeId); // Delete the recipe
    navigate("/"); // Navigate to the home page (or any other route)
  };

  return <button onClick={handleDelete}>Delete Recipe</button>;
};

export default DeleteRecipeButton;
