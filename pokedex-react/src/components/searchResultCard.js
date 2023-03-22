import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getPokemon } from "../services/search";
import { MDBIcon } from "mdb-react-ui-kit";

var type_icon = process.env.PUBLIC_URL + "/types/";

var type_bg = process.env.PUBLIC_URL + "/background/";

function SearchResultCard(props) {
    const [pokemon, setPokemon] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);
    const [isImageLoading, setIsImageLoading] = React.useState(true);
    const [hidden, setHidden] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false);

    useEffect(() => {
        setIsLoading(true);
        setIsImageLoading(true);
        if (props.pokemonUrl !== undefined) {
            getPokemon(props.pokemonUrl).then((pokemon) => {
                setPokemon(pokemon);
            });
            props.favPokemonList.includes(pokemon.id) ? setIsFavorite(true) : setIsFavorite(false);
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

    useEffect(() => {
        if (props.favPokemonList.includes(pokemon.id)) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [props.favPokemonList]);

    const handleFavClick = () => {  
        if (props.favPokemonList.includes(pokemon.id)) {
            // Remove from fav list
            props.setFavPokemonList(props.favPokemonList.filter((id) => id !== pokemon.id));
        } else {
            // Add to fav list
            props.setFavPokemonList([...props.favPokemonList, pokemon.id]);
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <Link to={"/pokemon/" + pokemon?.id}>
        {/* <Link to={""}> */}
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
                {isFavorite ? (
                    <MDBIcon fas icon="heart" className="pokemon-favorite-star" onClick={handleFavClick} size="3x"/>
                ) : (
                    <MDBIcon far icon="heart" className="pokemon-favorite-star" onClick={handleFavClick} size="3x"/>
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
