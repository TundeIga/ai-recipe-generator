"use client";

import { useState, useMemo } from "react";
import { Heart, Clock, Users } from "lucide-react";
import { Recipe } from "../types/recipe";

interface Props {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
  // Calculate initial saved state using useMemo
  const initialIsSaved = useMemo(() => {
    const saved = localStorage.getItem("savedRecipes");
    if (saved) {
      const recipes = JSON.parse(saved);
      return recipes.some((r: Recipe) => r.title === recipe.title);
    }
    return false;
  }, [recipe.title]);

  const [isSaved, setIsSaved] = useState(initialIsSaved);

  const toggleSave = () => {
    const saved = localStorage.getItem("savedRecipes");
    let recipes = saved ? JSON.parse(saved) : [];

    if (isSaved) {
      recipes = recipes.filter((r: Recipe) => r.title !== recipe.title);
    } else {
      recipes.push(recipe);
    }

    localStorage.setItem("savedRecipes", JSON.stringify(recipes));
    setIsSaved(!isSaved);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-fadeIn">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-3xl font-bold text-gray-800">{recipe.title}</h2>
        <button
          onClick={toggleSave}
          className={`p-2 rounded-full transition-colors ${
            isSaved
              ? "bg-red-100 text-red-500"
              : "bg-gray-100 text-gray-400 hover:text-red-500"
          }`}
        >
          <Heart className={`w-6 h-6 ${isSaved ? "fill-current" : ""}`} />
        </button>
      </div>

      <p className="text-gray-600 mb-4">{recipe.description}</p>

      <div className="flex gap-4 mb-6 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{recipe.prepTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{recipe.servings}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Ingredients
        </h3>
        <ul className="space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span className="text-gray-700">{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Instructions
        </h3>
        <ol className="space-y-3">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="flex items-start">
              <span className="shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                {index + 1}
              </span>
              <span className="text-gray-700 pt-0.5">{instruction}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
