import React from "react";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";

const App = () => {
  return (
    <div>
      <RecipeList />
      <AddRecipeForm />
    </div>
  );
};

export default App;
