import { useState, useEffect } from "react"
import { RecipesResponse, Recipe } from "../../assets/interface"

const Pagination = () => {
    const [recipes, setRecipes] = useState<Recipe[]>()
    const [page, setPage] = useState<number>(1)

    const [imageLoaded, setImageLoaded] = useState<{ [key: number]: boolean }>({})
    const fetchRecipes = async () => {
        const res = await fetch("https://dummyjson.com/recipes/?limit=50")
        const data: RecipesResponse = await res.json()
        setRecipes(data.recipes);
    }
    useEffect(() => {
        fetchRecipes()
        console.log(recipes)
    }, [])

    const selectPageHandler = (selectedPage: number) => {
        setPage(selectedPage)
    }
    const handleImageLoad = (id: number) => {
        setImageLoaded((prev) => ({
            ...prev,
            [id]: true,
        }))
    }
    return (
        <>
            {recipes != undefined && recipes.length > 0 &&
                <div className="px-80">
                    {
                        recipes.slice(page * 5 - 5, page * 5).map((recipe) => {
                            return (
                                <span key={recipe.id}>
                                    <div className="text-5xl">{recipe.name}</div>
                                    {!imageLoaded[recipe.id] && (
                                        <div className="w-[300px] h-[200px] flex items-center justify-center bg-gray-100 text-gray-500">
                                            Loading image...
                                        </div>
                                    )}
                                    <img
                                        src={recipe.image}
                                        alt={recipe.name + " image"}
                                        onLoad={() => handleImageLoad(recipe.id)}
                                        className={`${imageLoaded[recipe.id] ? "block" : "hidden"} w-[300px] h-[200px] object-cover`}
                                    />
                                    <div>
                                        <span className="">Ingredients:</span>
                                        {recipe.ingredients.map((ingredient) => {
                                            return (
                                                ingredient + ", "
                                            )
                                        })}
                                    </div>
                                    <div>
                                        <span className="text-2xl">Instructions:</span>
                                        <div>
                                            {recipe.instructions.map((instruction, id) => {
                                                return (
                                                    <div>{id + 1 + ":" + instruction}</div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                </span>
                            )
                        })
                    }
                    {/* //pagination */}
                    <span className="flex flex-row text-center">
                        <div className="cursor-pointer basis-xs" onClick={() => { if (page > 1) { setPage(page - 1) } }}>◀</div>
                        {[...Array(recipes.length / 5)].map((_, i) => {
                            return (
                                <div className={page === i + 1 ? "cursor-pointer basis-xs bg-amber-200" : "cursor-pointer basis-xs"} key={i} onClick={() => selectPageHandler(i + 1)}>
                                    {i + 1}
                                </div>
                            )
                        })}

                        <div className="cursor-pointer basis-xs" onClick={() => { if (page < recipes.length / 5) { setPage(page + 1) } }}>▶</div>
                    </span>
                </div>
            }
        </>
    )
}

export default Pagination