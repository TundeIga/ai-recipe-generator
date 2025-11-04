"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

interface Props {
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
}

export default function IngredientInput({
  ingredients,
  setIngredients,
}: Props) {
  const [input, setInput] = useState("");

  const addIngredient = () => {
    if (input.trim() && !ingredients.includes(input.trim())) {
      setIngredients([...ingredients, input.trim()]);
      setInput("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Your Ingredients
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addIngredient()}
          placeholder="e.g., chicken, tomatoes, garlic..."
          className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
        />
        <button
          onClick={addIngredient}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {ingredients.map((ingredient) => (
          <span
            key={ingredient}
            className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm flex items-center gap-2"
          >
            {ingredient}
            <button
              onClick={() => removeIngredient(ingredient)}
              className="hover:text-orange-900"
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
