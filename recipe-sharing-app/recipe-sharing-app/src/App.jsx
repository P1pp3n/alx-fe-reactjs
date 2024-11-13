import React from "react";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";

const App = () => {
  return (
    <div>
      <RecipeList />
      <AddRecipeForm />
    </div>
  );
};

export default App;
