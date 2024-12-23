import { useState, type FormEvent } from "react";
import type { Recipe } from "../utils/db";
import Searchbar from "./SearchBar";
import RecipeCard from "./RecipeCard";

export default function RecipeIsland({ recipes }: { recipes: Recipe[] }) {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const searchTerm = formData.get("search") as string;

    const searchResults = recipes
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
    setSearchPerformed(true);
  };

  const handleReset = () => {
    setFilteredRecipes([]);
    setSearchPerformed(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Searchbar onSubmit={handleSubmit} handleReset={handleReset} />
      {searchPerformed ? (
        filteredRecipes.length > 0 ? (
          <div className="space-y-8" data-recipes-container>
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
            <button
              onClick={handleReset}
              className="mt-5 mb-5 p-3 text-white text-center rounded"
              style={{ backgroundColor: '#E11D48' }}
            >
              Back to Search
            </button>
          </div>
        )
      ) : null}
    </div>
  );
}
