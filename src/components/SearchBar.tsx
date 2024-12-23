import { useState } from "react";

export default function Searchbar({
  onSubmit,
  handleReset,
}: {
  onSubmit: any;
  handleReset: any;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="my-8 w-full flex-col">
      <div className="w-full max-w-md rounded-lg bg-card p-8 shadow-lg">
        <form className="flex gap-2" onSubmit={onSubmit}>
          <input
            type="text"
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recipes..."
            className="w-full rounded border border-input bg-card px-4 py-2 text-muted-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Search
          </button>
        </form>
      </div>
      <div className="mt-4 w-full max-w-md">
        <button
          onClick={() => {
            setSearchTerm("");
            handleReset();
          }}
          className="w-full rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Reset Search
        </button>
      </div>
    </div>
  );
}
