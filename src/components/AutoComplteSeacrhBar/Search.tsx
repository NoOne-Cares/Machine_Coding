import { useEffect, useState } from "react";

interface Recipe {
    id: number;
    name: string;
}

const Search = () => {
    const [input, setInput] = useState<string>("");
    const [results, setResults] = useState<Recipe[]>([]);
    //cashing
    const [cache  setcache] = useState({})
    const fetchData = async () => {
        if (cache[input]) {
            setResults[cache[input]]
            return
        }
        try {
            const response = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
            const data = await response.json();
            setResults(data.recipes || []);
            setcache((prev) => {...prev, [input]: data?.recipes})
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

useEffect(() => {
    //debouncing
    const timer = setTimeout(fetchData, 300)
    return () => {
        clearTimeout(timer)
    }
}, [input]);

return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-yellow-50 p-6">
        <h1 className="text-3xl font-bold text-sky-700 mb-6">Auto Complete Recipe Search</h1>

        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for recipes..."
            className="w-full max-w-md px-4 py-2 rounded-md shadow-md border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition mb-6"
        />

        <div className="w-full max-w-2xl grid gap-4">
            {results.length > 0 ? (
                results.map((recipe) => (
                    <div
                        key={recipe.id}
                        className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 border border-gray-100"
                    >
                        <span className="text-lg font-semibold text-gray-800">{recipe.name}</span>
                    </div>
                ))
            ) : input ? (
                <div className="text-gray-500 text-center">No recipes found.</div>
            ) : null}
        </div>
    </div>
);
};

export default Search;
