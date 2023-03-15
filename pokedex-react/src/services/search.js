export async function getPokemon(url) {
    return await fetch(url)
        .then((res) => res.json())
        .then(async (pokemon) => {
            return {
                id: pokemon.id,
                name: pokemon.species.name,
                image: pokemon.sprites.front_default,
                // types: pokemon.types.map((type) => type.type.name).join(", "),
                types: pokemon.types,
            };
        });
}

export async function getTotalCount() {
    return await fetch("https://pokeapi.co/api/v2/pokemon?limit=1")
        .then((res) => res.json())
        .then((count) => {
            return count.count;
        });
}
