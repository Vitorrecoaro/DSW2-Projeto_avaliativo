import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getPokemon } from "../services/search";

var type_icon = process.env.PUBLIC_URL + "/types/";

var type_bg = process.env.PUBLIC_URL + "/background/";

function SearchResultCard(props) {
    const [pokemon, setPokemon] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);
    const [isImageLoading, setIsImageLoading] = React.useState(true);
    const [hidden, setHidden] = React.useState(false);

    useEffect(() => {
        setIsLoading(true);
        setIsImageLoading(true);
        if (props.pokemonUrl !== undefined) {
            getPokemon(props.pokemonUrl).then((pokemon) => {
                setPokemon(pokemon);
            });
        }
    }, [props.pokemonUrl]);

    useEffect(() => {
        if (pokemon.id !== undefined) {
            setIsLoading(false);
        }
    }, [pokemon]);

    const handleImageLoad = () => {
        setIsImageLoading(false);
    };

    return (
        <Link to={"/pokemon/" + pokemon?.id}>
            <div className="grid-content-search-results-item">
                {!isImageLoading && (
                    <img
                        className="search-results-item-img-bg"
                        src={type_bg + pokemon?.types[0].type.name + ".jpg"}
                        alt="Pokedex"
                    />
                )}
                {isImageLoading && (
                    <>
                        <div className="search-results-item-img-bg"></div>
                        <div className="search-skeleton-item-img"></div>
                    </>
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
                    <h2 className={isLoading ? "search-skeleton-item-h2" : undefined}>
                        {!isLoading && "#" + pokemon.id + " " + pokemon.name}
                    </h2>
                    <p className={isLoading ? "search-skeleton-item-p" : undefined}>
                        {!isLoading &&
                            pokemon?.types.map((type) => (
                                <img
                                    className="content-title-properties"
                                    key={type.type.name}
                                    src={type_icon + type.type.name + ".png"}
                                    alt="Type"
                                />
                            ))}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default SearchResultCard;
