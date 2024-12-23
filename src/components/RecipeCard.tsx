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
    <div className="container mx-auto space-y-[1em] rounded-lg border-border bg-card p-6 shadow-l">
      <h2 style={{ color: '#E11D48', textAlign: 'center'}}>{title || "Recipe Title"}</h2>
      <p style={{ textAlign: 'center'}}>{description || "Recipe description"}</p>
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
      <p className="text-lg font-bold mx-2">Ingredients:</p>
      <ul className="list-disc mx-4">
        {!ingredients || ingredients.length === 0 ? (
          <li>Ingredients not found</li>
        ) : (
          ingredients.map((ingredient: string) => <li>{ingredient}</li>)
        )}
      </ul>
      <p className="text-lg font-bold mx-2">Instructions:</p>
      <ol className="list-decimal mx-4">
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
