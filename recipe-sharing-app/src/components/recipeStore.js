import {create} from "zustand";

const useRecipeStore = create((set) => ({
  recipes: [], // The list of all recipes
  favorites: [], // The list of favorite recipe IDs

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

  // Action to load recipes into the store
  loadRecipes: (newRecipes) => set({ recipes: newRecipes }),

  // Add a recipe to favorites
  addFavorite: (recipeId) =>
    set((state) => {
      if (!state.favorites.includes(recipeId)) {
        return { favorites: [...state.favorites, recipeId] };
      }
      return state; // If already in favorites, do nothing
    }),

  // Remove a recipe from favorites
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // Recommendations (mock implementation based on favorites)
  recommendations: [],

  // Action to generate recommendations based on favorites
  generateRecommendations: () =>
    set((state) => {
      const recommended = state.recipes.filter(
        (recipe) => state.favorites.includes(recipe.id) && Math.random() > 0.5 // Mock logic
      );
      return { recommendations: recommended };
    }),
}));

export default useRecipeStore;
