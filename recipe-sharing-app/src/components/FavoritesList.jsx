import { create } from "zustand";

const useRecipeStore = create((set) => ({
  recipes: [], // The list of all recipes
  favorites: [], // Array to store the IDs of favorite recipes

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

  // Action to add a recipe to favorites
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...state.favorites, recipeId],
    })),

  // Action to remove a recipe from favorites
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // Action to generate recipe recommendations based on favorites
  recommendations: [],
  generateRecommendations: () =>
    set((state) => {
      // Basic implementation of recommendations (you can improve the logic later)
      const recommended = state.recipes.filter((recipe) =>
        state.favorites.includes(recipe.id)
      );
      return { recommendations: recommended };
    }),

  // Action to load recipes into the store (useful for initial loading)
  loadRecipes: (newRecipes) => set({ recipes: newRecipes }),
}));

export default useRecipeStore;
