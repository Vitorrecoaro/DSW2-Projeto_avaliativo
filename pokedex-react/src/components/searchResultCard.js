import React from "react";
import { getPokemon } from "../services/search";

import pokedexwpp from "../images/pokedexwpp.jpg";

var path = process.env.PUBLIC_URL + "/types/";

function SearchResultCard(props) {
    const [pokemon, setPokemon] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);
    const [isImageLoading, setIsImageLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(true);
        setIsImageLoading(true);
        if (props.pokemonUrl !== undefined) {
        getPokemon(props.pokemonUrl).then((pokemon) => {
            setPokemon(pokemon);
            setIsLoading(false);
        });
        }
    }, [props.pokemonUrl]);

    const handleImageLoad = () => {
        setIsImageLoading(false);
    };

    return (
        <a href="#">
                <div className="grid-content-search-results-item">
                    <img
                        className="search-results-item-img-bg"
                        src={pokedexwpp}
                        alt="Pokedex"
                    />
                    {isImageLoading && (
                        <div className="search-skeleton-item-img"></div>
                    )}
                    {!isLoading && (
                    <img
                        className="search-results-item-img"
                        hidden={isImageLoading}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                        alt={`${pokemon.name} image`}
                        onLoad={handleImageLoad}
                    />
                    )}
                        <div className="search-results-item-info">
                            <h2 className={isLoading ? "search-skeleton-item-h2" : undefined}>{!isLoading && ("#" + pokemon.id + " " + pokemon.name)}</h2>
                            <p className={isLoading ? "search-skeleton-item-p" : undefined}>{!isLoading && (pokemon.types.map((type) => (
                                <img src={path + type.type.name + ".png"} alt="Type" />
                            )))}</p>
                        </div>
                </div>
        </a>
    );
}

export default SearchResultCard;
