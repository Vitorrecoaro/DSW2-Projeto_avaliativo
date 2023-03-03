import React from "react";
import { getPokemon } from "../services/search";

import pokedexwpp from "../images/pokedexwpp.jpg";

function SearchResultCard(props) {
    const [pokemon, setPokemon] = React.useState({});

    React.useEffect(() => {
        getPokemon(props.pokemonId).then(pokemon => {
        setPokemon(pokemon);
        });
    }, [props.pokemon]);

    return (
        
        <a href="#">
            {pokemon.id != "undefined" &&
            <div className="grid-content-search-results-item">
                <img className="search-results-item-img-bg" src={pokedexwpp} alt="Pokedex" />
                <img
                    className="search-results-item-img"
                    src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+ pokemon.id +".png"}
                    alt={pokemon.name} />
                <div className="search-results-item-info">
                    <h2>{pokemon.name}</h2>
                    <p>{"#"+pokemon.id}</p>
                    <p>{pokemon.types}</p>
                </div>
            </div>
            }
        </a>
    );
}

export default SearchResultCard;