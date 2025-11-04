"use client";

import { useState } from "react";
import { Trash2, BookOpen } from "lucide-react";
import { Recipe } from "../types/recipe";

interface Props {
  onSelectRecipe: (recipe: Recipe) => void;
}

// Helper function to get saved recipes
function getSavedRecipes(): Recipe[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("savedRecipes");
  return saved ? JSON.parse(saved) : [];
}

export default function SavedRecipes({ onSelectRecipe }: Props) {
  // Initialize state directly from localStorage
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>(getSavedRecipes);

  const deleteRecipe = (title: string) => {
    const updated = savedRecipes.filter((r) => r.title !== title);
    setSavedRecipes(updated);
    localStorage.setItem("savedRecipes", JSON.stringify(updated));
  };

  if (savedRecipes.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No Saved Recipes Yet
        </h2>
        <p className="text-gray-600">
          Generate and save your favorite recipes to see them here!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Saved Recipes</h2>
      {savedRecipes.map((recipe) => (
        <div
          key={recipe.title}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {recipe.title}
              </h3>
              <p className="text-gray-600 mb-3">{recipe.description}</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>⏱️ {recipe.prepTime}</span>
                <span>👥 {recipe.servings}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onSelectRecipe(recipe)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                View
              </button>
              <button
                onClick={() => deleteRecipe(recipe.title)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
