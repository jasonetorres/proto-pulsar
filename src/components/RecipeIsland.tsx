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
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Searchbar onSubmit={handleSubmit} handleReset={handleReset} />

      {filteredRecipes.length > 0 ? (
        <div className="space-y-8" data-recipes-container>
          {filteredRecipes.map((recipe, index) => (
            <RecipeCard
              key={recipe._id + index}
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
        <p>No recipes found.</p>
      )}
    </div>
  );
}
