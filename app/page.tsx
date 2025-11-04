"use client";

import { useState } from "react";
import { ChefHat, Sparkles } from "lucide-react";
import IngredientInput from "./components/IngredientInput";
import DietaryPreferences from "./components/DietaryPreferences";
import RecipeCard from "./components/RecipeCard";
import SavedRecipes from "./components/SavedRecipes";

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [dietary, setDietary] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const generateRecipe = async () => {
    if (ingredients.length === 0) {
      alert("Please add at least one ingredient!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/app/api/generate-recipe/route.ts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients, dietary }),
      });

      const data = await response.json();
      setRecipe(data.recipe);
    } catch (error) {
      console.error("Error generating recipe:", error);
      alert("Failed to generate recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="w-12 h-12 text-orange-500" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
              AI Recipe Generator
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Enter your ingredients and let AI create amazing recipes for you!
          </p>
        </div>

        {/* Toggle Saved Recipes */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowSaved(!showSaved)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            {showSaved ? "Generate New Recipe" : "View Saved Recipes"}
          </button>
        </div>

        {showSaved ? (
          <SavedRecipes
            onSelectRecipe={(r) => {
              setRecipe(r);
              setShowSaved(false);
            }}
          />
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side - Inputs */}
            <div className="space-y-6">
              <IngredientInput
                ingredients={ingredients}
                setIngredients={setIngredients}
              />

              <DietaryPreferences dietary={dietary} setDietary={setDietary} />

              <button
                onClick={generateRecipe}
                disabled={loading || ingredients.length === 0}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Recipe
                  </>
                )}
              </button>
            </div>

            {/* Right Side - Recipe */}
            <div>
              {recipe ? (
                <RecipeCard recipe={recipe} />
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-dashed border-gray-300">
                  <ChefHat className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">
                    Your generated recipe will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
