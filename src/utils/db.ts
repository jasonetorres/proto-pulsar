import { DataAPIClient, Db, type VectorizeDoc } from "@datastax/astra-db-ts";
import dotenv from "dotenv";
dotenv.config();

/**
 * Connects to a DataStax Astra database.
 * This function retrieves the database endpoint and application token from the
 * environment variables ASTRA_DB_API_ENDPOINT and ASTRA_DB_APPLICATION_TOKEN.
 *
 * @returns An instance of the connected database.
 * @throws Will throw an error if the environment variables
 * ASTRA_DB_API_ENDPOINT or ASTRA_DB_APPLICATION_TOKEN are not defined.
 */
export function connectToDatabase(): Db {
  const { ASTRA_DB_API_ENDPOINT: endpoint, ASTRA_DB_APPLICATION_TOKEN: token } = process.env;

  if (!token || !endpoint) {
    throw new Error(
      "Environment variables ASTRA_DB_API_ENDPOINT and ASTRA_DB_APPLICATION_TOKEN must be defined.",
    );
  }

  // Create an instance of the DataAPIClient class with your token.
  const client = new DataAPIClient(token);

  // Get the database specified by your endpoint.
  const database = client.db(endpoint, { keyspace: "christmas_cookies" });

  console.log(`Connected to database ${database.id}`);

  return database;
}

export async function getRecipes(searchTerm?: string): Promise<Recipe[]> {
  const db = connectToDatabase();
  const recipes = db.collection<Recipe>("recipes");

  try {
    // Fetch all recipes
    const allRecipes = await recipes.find({}).toArray();

    if (searchTerm) {
      console.log(`Searching with term: ${searchTerm}`);

      // Filter recipes based on the search term
      const filteredRecipes = allRecipes.filter(recipe => {
        const regex = new RegExp(searchTerm, 'i');
        const titleMatch = regex.test(recipe.title);
        const descriptionMatch = regex.test(recipe.description);
        console.log(`Checking recipe: ${recipe.title}, Title match: ${titleMatch}, Description match: ${descriptionMatch}`);
        return titleMatch || descriptionMatch;
      });

      console.log(`Found results: ${filteredRecipes.length}`);
      return filteredRecipes;
    }

    return allRecipes;
  } catch (error) {
    console.error("Error getting recipes: ", error);
    return [];
  }
}

export interface Recipe extends VectorizeDoc {
  id: React.Key | null | undefined;
  _id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  totalTime: string;
  difficulty: string;
}
