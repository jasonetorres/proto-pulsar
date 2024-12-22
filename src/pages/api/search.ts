import type { APIRoute } from "astro";
import { getRecipes } from "../../utils/db";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q") || "";

  console.log("Search term:", searchTerm);

  let recipes = await getRecipes();

  if (typeof searchTerm === 'string' && searchTerm.trim() !== '') {
    console.log(`Filtering with term: ${searchTerm}`);

    const regex = new RegExp(searchTerm, 'i');
    recipes = recipes.filter(recipe => {
      const titleMatch = regex.test(recipe.title);
      const descriptionMatch = regex.test(recipe.description);
      console.log(`Checking recipe: ${recipe.title}, Title match: ${titleMatch}, Description match: ${descriptionMatch}`);
      return titleMatch || descriptionMatch;
    });
  }

  console.log("Results found:", recipes.length);

  return new Response(JSON.stringify(recipes), {
    headers: { "Content-Type": "application/json" },
  });
};
