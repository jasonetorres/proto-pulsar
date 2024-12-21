import type { APIRoute } from "astro";
import { getRecipes } from "../../utils/db";

export const GET: APIRoute = async ({ request }) => {
 const url = new URL(request.url);
 const searchTerm = url.searchParams.get("q") || "";;
 
 console.log("Search term:", searchTerm);
  let recipes;
  if (searchTerm.trim()) {
    const query = {
      $or: [
        { title: { $regex: `.*${searchTerm}.*`, $options: "i" } },
        { description: { $regex: `.*${searchTerm}.*`, $options: "i" } },
      ],
    };
    // console.log("Database query:", JSON.stringify(query, null, 2));
    recipes = await getRecipes(query);
  } else {
    recipes = await getRecipes();
  }

  console.log("Results found:", recipes.length);

  return new Response(JSON.stringify(recipes), {
    headers: { "Content-Type": "application/json" },
  });
};
