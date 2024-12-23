interface RecipeCardProps {  
  cookTime: string;
  description: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  title: string;
  totalTime: string;
}

export default function RecipeCard({cookTime, description, difficulty, ingredients, instructions, prepTime, title, totalTime}: RecipeCardProps) {
  return (
    <div className="container mx-auto space-y-[1em] rounded-lg border-2 border-border bg-card p-6">
      <h2>{title || "Recipe Title"}</h2>
      <p>{description || "Recipe description"}</p>
      <div className="mx-auto w-fit space-y-0 rounded-md border-2 border-dashed border-primary px-4">
        <div className="flex justify-center gap-4 py-4 text-center">
          <div>
            <p className="text-sm font-bold">Total Time</p>
            <p className="text-sm">{totalTime || "Total Time not found"}</p>
          </div>

          <div>
            <p className="text-sm font-bold">Difficulty</p>
            <p className="text-sm">{difficulty || "Difficulty not found"}</p>
          </div>
        </div>
      </div>
      <p className="text-lg font-bold">Ingredients:</p>
      <ul className="list-disc ">
        {!ingredients || ingredients.length === 0 ? (
          <li>Ingredients not found</li>
        ) : (
          ingredients.map((ingredient: string) => <li>{ingredient}</li>)
        )}
      </ul>
      <p className="text-lg font-bold">Instructions:</p>
      <ol className="list-decimal">
        {!instructions || instructions.length === 0 ? (
          <li>Instructions not found</li>
        ) : (
          instructions.map((instruction: string) => <li>{instruction}</li>)
        )}
      </ol>

      <div className="flex justify-center gap-4 py-4 text-center">
        <div>
          <p className="text-sm font-bold">Prep Time</p>
          <p className="text-sm">{prepTime || "Prep Time not found"}</p>
        </div>

        <div>
          <p className="text-sm font-bold">Cook Time</p>
          <p className="text-sm">{cookTime || "Cook Time not found"}</p>
        </div>

        <div>
          <p className="text-sm font-bold">Total Time</p>
          <p className="text-sm">{totalTime || "Total Time not found"}</p>
        </div>
      </div>
    </div>
  );
}

{
  /* <style>
  ul, ol {
    margin-left: 2rem;
  }
</style> */
}
