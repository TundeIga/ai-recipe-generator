"use client";

interface Props {
  dietary: string[];
  setDietary: (dietary: string[]) => void;
}

const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Keto",
  "Low-Carb",
  "High-Protein",
];

export default function DietaryPreferences({ dietary, setDietary }: Props) {
  const toggleDietary = (option: string) => {
    if (dietary.includes(option)) {
      setDietary(dietary.filter((d) => d !== option));
    } else {
      setDietary([...dietary, option]);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Dietary Preferences
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        Optional - select any that apply
      </p>

      <div className="flex flex-wrap gap-2">
        {dietaryOptions.map((option) => (
          <button
            key={option}
            onClick={() => toggleDietary(option)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              dietary.includes(option)
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
