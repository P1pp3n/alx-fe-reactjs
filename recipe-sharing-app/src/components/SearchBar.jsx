import React from "react";
import useRecipeStore from "../components/recipeStore"; // Ensure correct import path

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  const handleChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term in the store
    filterRecipes(); // Trigger filtering based on the updated search term
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
