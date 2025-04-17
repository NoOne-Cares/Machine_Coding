// Define the structure of one recipe
export interface Recipe {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string[];
    caloriesPerServing: number;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    tags: string[];
    userId: number;
    image: string,
    rating: number;
    reviewCount: number,
    mealType: string[];

}

// Define the structure of the full response
export interface RecipesResponse {
    recipes: Recipe[];
    total?: number;
    skip?: number;
    limit?: number;
}


