import { NextResponse } from "next/server";

interface Recipe {
  title: string;
  description: string;
  prepTime: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

// Mock recipe templates
const recipeTemplates = [
  {
    titlePrefix: "Savory",
    descriptions: [
      "A delicious and comforting dish perfect for any occasion",
      "An aromatic blend of flavors that will tantalize your taste buds",
      "A hearty meal that brings warmth and satisfaction",
    ],
    cookingMethods: ["Sauté", "Roast", "Simmer", "Bake", "Grill"],
  },
  {
    titlePrefix: "Golden",
    descriptions: [
      "A crispy and flavorful creation that's sure to impress",
      "Perfectly seasoned with a beautiful golden finish",
      "A crowd-pleasing dish with incredible texture",
    ],
    cookingMethods: ["Pan-fry", "Bake", "Roast", "Grill"],
  },
  {
    titlePrefix: "Mediterranean",
    descriptions: [
      "Fresh ingredients come together in this vibrant dish",
      "Light yet satisfying with incredible depth of flavor",
      "A healthy and delicious meal inspired by coastal cuisine",
    ],
    cookingMethods: ["Sauté", "Grill", "Bake", "Toss"],
  },
];

const instructions = [
  "Prepare all ingredients by washing and chopping as needed.",
  "Heat oil in a large pan over medium-high heat.",
  "Add aromatics and cook until fragrant, about 2-3 minutes.",
  "Add main ingredients and season generously with salt and pepper.",
  "Cook, stirring occasionally, until ingredients are tender and golden.",
  "Add any liquid ingredients and bring to a simmer.",
  "Reduce heat and let cook until flavors melt together.",
  "Taste and adjust seasoning as needed.",
  "Garnish with fresh herbs before serving.",
  "Serve hot and enjoy immediately.",
];

function generateMockRecipe(ingredients: string[], dietary: string[]): Recipe {
  const template =
    recipeTemplates[Math.floor(Math.random() * recipeTemplates.length)];
  const mainIngredient = ingredients[0] || "vegetables";

  // Generate title
  const title = `${template.titlePrefix} ${
    mainIngredient.charAt(0).toUpperCase() + mainIngredient.slice(1)
  } Delight`;

  // Generate description
  const description =
    template.descriptions[
      Math.floor(Math.random() * template.descriptions.length)
    ];

  // Generate prep time (15-60 minutes)
  const prepTime = `${15 + Math.floor(Math.random() * 9) * 5} minutes`;

  // Generate servings (2-6)
  const servings = `${2 + Math.floor(Math.random() * 5)} servings`;

  // Generate ingredients list with measurements
  const measurements = [
    "2 cups",
    "1 lb",
    "3 tbsp",
    "1/2 cup",
    "4 cloves",
    "2 tbsp",
    "1 cup",
    "3/4 lb",
  ];
  const recipeIngredients = ingredients.map((ing, idx) => {
    const measurement = measurements[idx % measurements.length];
    return `${measurement} ${ing}`;
  });

  // Add some common ingredients
  const commonIngredients = [
    "2 tbsp olive oil",
    "Salt and pepper to taste",
    "2 cloves garlic, minced",
    "Fresh herbs for garnish",
  ];

  const allIngredients = [
    ...recipeIngredients,
    ...commonIngredients.slice(0, 2 + Math.floor(Math.random() * 2)),
  ];

  // Generate instructions
  const numSteps = 6 + Math.floor(Math.random() * 4);
  const selectedInstructions = [];
  const usedIndices = new Set();

  while (
    selectedInstructions.length < numSteps &&
    usedIndices.size < instructions.length
  ) {
    const idx = Math.floor(Math.random() * instructions.length);
    if (!usedIndices.has(idx)) {
      usedIndices.add(idx);
      selectedInstructions.push(instructions[idx]);
    }
  }

  // Add dietary note if applicable
  let finalDescription = description;
  if (dietary.length > 0) {
    finalDescription += ` This ${dietary
      .join(", ")
      .toLowerCase()} recipe is perfect for those with dietary preferences.`;
  }

  return {
    title,
    description: finalDescription,
    prepTime,
    servings,
    ingredients: allIngredients,
    instructions: selectedInstructions,
  };
}

export async function POST(request: Request) {
  try {
    const { ingredients, dietary } = await request.json();

    console.log("Generating mock recipe...");

    // Simulate API delay for realism
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const recipe = generateMockRecipe(ingredients, dietary);

    console.log("Mock recipe generated successfully!");

    return NextResponse.json({ recipe });
  } catch (error) {
    console.error("Error generating recipe:", error);
    return NextResponse.json(
      {
        error: `Failed to generate recipe: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
