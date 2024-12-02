import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import recipeData from "../data.json";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch recipe data by ID
    const selectedRecipe = recipeData.find((item) => item.id === parseInt(id));
    setRecipe(selectedRecipe);
  }, [id]);

  if (!recipe) {
    return <div className="text-center mt-20">Loading recipe details...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded shadow-lg p-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
        <p className="text-gray-700 mb-6">{recipe.summary}</p>
        <h2 className="text-2xl font-semibold mb-4">Ingredients:</h2>
        <ul className="list-disc pl-6 mb-6">
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index} className="text-gray-600">
              {ingredient}
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold mb-4">Cooking Instructions:</h2>
        <ol className="list-decimal pl-6">
          {recipe.instructions?.map((step, index) => (
            <li key={index} className="text-gray-600 mb-2">
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetail;
