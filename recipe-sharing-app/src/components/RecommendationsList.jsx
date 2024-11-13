import React, { useEffect } from "react";
import useRecipeStore from "../components/recipeStore.js";

const RecommendationsList = () => {
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );
  const recommendations = useRecipeStore((state) => state.recommendations);

  useEffect(() => {
    // Generate recommendations whenever the component mounts or favorites change
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <div>
      <h2>Recommended for You</h2>
      {recommendations.length > 0 ? (
        recommendations.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      ) : (
        <p>No recommendations available</p>
      )}
    </div>
  );
};

export default RecommendationsList;
