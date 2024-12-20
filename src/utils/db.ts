import { DataAPIClient, Db, type VectorizeDoc } from "@datastax/astra-db-ts";
import dotenv from "dotenv";
dotenv.config();

/**
 * Connects to a DataStax Astra database.
 * This function retrieves the database endpoint and application token from the
 * environment variables `ASTRA_DB_API_ENDPOINT` and `ASTRA_DB_APPLICATION_TOKEN`.
 *
 * @returns An instance of the connected database.
 * @throws Will throw an error if the environment variables
 * `ASTRA_DB_API_ENDPOINT` or `ASTRA_DB_APPLICATION_TOKEN` are not defined.
 */
export function connectToDatabase(): Db {
  const { ASTRA_DB_API_ENDPOINT: endpoint, ASTRA_DB_APPLICATION_TOKEN: token } =
    process.env;

  if (!token || !endpoint) {
    throw new Error(
      "Environment variables ASTRA_DB_API_ENDPOINT and ASTRA_DB_APPLICATION_TOKEN must be defined."
    );
  }

  // Create an instance of the `DataAPIClient` class with your token.
  const client = new DataAPIClient(token);

  // Get the database specified by your endpoint.
  const database = client.db(endpoint, { keyspace: "christmas_cookies" });

  console.log(`Connected to database ${database.id}`);

  return database;
}

export const getRecipes = async (): Promise<Recipe[]> => {
  const db = connectToDatabase();
  const recipes = db.collection<Recipe>("recipes");

  try {
    const allRecipes = recipes.find({});
    return await allRecipes.toArray();
  } catch (error) {
    console.error("Error getting recipes: ", error);
    return [];
  }
};

export interface Recipe extends VectorizeDoc {
  _id: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}
