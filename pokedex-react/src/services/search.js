function getEnglishOption(languages) {
    return languages.find((obj) => obj.language.name === "en").name;
}

async function getName(specie) {
    const pokemonSpecie = await fetch(specie.url).then((res) => res.json());
    const name = getEnglishOption(pokemonSpecie.names);

    return name;
}

async function getTypes(types) {
    const objTypes = [];

    for (let type of types) {
        await fetch(type.type.url)
            .then((res) => res.json())
            .then((data) => {
                objTypes.push(getEnglishOption(data.names));
            });
    }

    return objTypes.join(", ");
}

export async function getPokemon(url) {
    return await fetch(url)
        .then((res) => res.json())
        .then(async (pokemon) => {
            let name = await getName(pokemon.species);
            let type = await getTypes(pokemon.types);
            return {
                id: pokemon.id,
                name: name,
                image: pokemon.sprites.front_default,
                // types: pokemon.types.map((type) => type.type.name).join(", "),
                types: type,
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
