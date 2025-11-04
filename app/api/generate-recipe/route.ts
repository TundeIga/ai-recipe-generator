import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { ingredients, dietary } = await request.json();

    // Check if API key exists
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key is missing!");
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    const dietaryText =
      dietary.length > 0 ? `The recipe must be ${dietary.join(", ")}.` : "";

    const prompt = `Create a detailed recipe using these ingredients: ${ingredients.join(
      ", "
    )}.
    ${dietaryText}
    
    Return the response in this exact JSON format:
    {
      "title": "Recipe name",
      "description": "Brief appetizing description",
      "prepTime": "X minutes",
      "servings": "X servings",
      "ingredients": ["ingredient 1 with measurement", "ingredient 2 with measurement"],
      "instructions": ["step 1", "step 2", "step 3"]
    }
    
    Make it creative and delicious!`;

    console.log("Calling OpenAI API...");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a creative chef AI that creates delicious recipes. Always respond with valid JSON only, no additional text.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      return NextResponse.json(
        {
          error: `OpenAI API Error: ${
            errorData.error?.message || "Unknown error"
          }`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const recipeText = data.choices[0].message.content;

    console.log("Recipe generated successfully!");

    // Parse the JSON response
    const recipe = JSON.parse(recipeText);

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
