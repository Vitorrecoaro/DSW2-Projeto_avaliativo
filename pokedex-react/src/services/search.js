function getEnglishOption(languages) {
    return languages.find((obj) => obj.language.name === "en").name;
}

export async function getName(specie) {
    const pokemonSpecie = await fetch(specie.url).then((res) => res.json());
    const name = getEnglishOption(pokemonSpecie.names);

    return name;
}

export async function getPokemon(url) {
    return await fetch(url)
        .then((res) => res.json())
        .then(async (pokemon) => {
            const name = await getName(pokemon.species);
            return {
                id: pokemon.id,
                name: name,
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
