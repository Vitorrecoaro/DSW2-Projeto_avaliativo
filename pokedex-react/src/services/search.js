
async function getPokemon(pokemonId){
    //Não é a solução mais otimizada, porém como desejamos mais informações além do nome e id (tipo e imagens)
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(res => res.json())
        .then(pokemon => {
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.front_default,
                types: pokemon.types.map(type => type.type.name),
            }
        });
}

async function getTotalCount(){
    return await fetch("https://pokeapi.co/api/v2/pokemon?limit=1")
        .then(res => res.json())
        .then(count => {
            return count.count;
        }
    );
}

export { getPokemon, getTotalCount };