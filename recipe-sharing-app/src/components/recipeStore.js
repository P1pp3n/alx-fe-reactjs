import {create} from "zustand";

const useRecipeStore = create((set) => ({
  recipes: [], // List of all recipes

  // Action to add a new recipe
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),

  // Action to delete a recipe by ID
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),

  // Action to update a recipe by ID
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),

  // Action to set the recipes (useful for initial loading)
  setRecipes: (newRecipes) => set({ recipes: newRecipes }),

  // New state for search term
  searchTerm: "",

  // Action to set the search term
  setSearchTerm: (term) => set({ searchTerm: term }),

  // Action to filter recipes based on search term
  filterRecipes: () =>
    set((state) => {
      const searchTerm = state.searchTerm.toLowerCase();
      const filtered = state.recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchTerm) || // Filter by title
          recipe.description.toLowerCase().includes(searchTerm) // Filter by description
      );
      return { filteredRecipes: filtered };
    }),

  // Action to get filtered recipes (use this in your components)
  filteredRecipes: [],

  // Action to load recipes into the store
  loadRecipes: (newRecipes) => set({ recipes: newRecipes }),
}));

export default useRecipeStore;
