import { useState, type FormEvent } from "react";
import type { Recipe } from "../utils/db";
import Searchbar from "./SearchBar";
import RecipeCard from "./RecipeCard";

export default function RecipeIsland({ recipes }: { recipes: Recipe[] }) {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const searchTerm = formData.get("search") as string;

    const searchResults = filteredRecipes
      .filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .reduce((uniqueRecipes: Recipe[], recipe) => {
        if (!uniqueRecipes.some((r) => r._id === recipe._id)) {
          uniqueRecipes.push(recipe);
        }
        return uniqueRecipes;
      }, []);

    console.log(searchResults);
    setFilteredRecipes(searchResults);
  };

  const handleReset = () => {
    setFilteredRecipes(recipes);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {filteredRecipes.length > 0 ? (
        <div className="space-y-8" data-recipes-container>
          <Searchbar onSubmit={handleSubmit} handleReset={handleReset} />
          {filteredRecipes.map((recipe, index) => (
            <RecipeCard
              key={`recipe-${index}-${recipe.title.toLocaleLowerCase()}`}
              cookTime={recipe.cookTime}
              description={recipe.description}
              difficulty={recipe.difficulty}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              prepTime={recipe.prepTime}
              title={recipe.title}
              totalTime={recipe.totalTime}
            />
          ))}
        </div>
      ) : (
        <div>
          <p>No recipes found.</p>
          <button onClick={handleReset} className="mt-5 mb-5 p-2 text-white rounded" style={{ backgroundColor: '#E11D48' }} >
            Back to Search
          </button>
        </div>
      )}
    </div>
  );
}
