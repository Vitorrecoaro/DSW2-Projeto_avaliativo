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
    const [favIcon, setFavIcon] = React.useState();

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
            setIsFavorite(JSON.parse(localStorage.getItem("favList")).includes(pokemon.id));
        }
    }, [pokemon]);

    const handleImageLoad = () => {
        setIsImageLoading(false);
    };

    useEffect(() => {
        if (isFavorite) {
            setFavIcon(
                <MDBIcon fas icon="heart" className="search-results-item-fav-icon" onClick={handleFavClick} size="3x"/>
            );
            // Add pokemon.id to favorites list in localstorage
            let favList = JSON.parse(localStorage.getItem("favList"));
            if (!favList.includes(pokemon.id)) {
                favList.push(pokemon.id);
                localStorage.setItem("favList", JSON.stringify(favList));
            }
        } else {
            setFavIcon(
                <MDBIcon far icon="heart" className="search-results-item-fav-icon" onClick={handleFavClick} size="3x"/>
            );
            // Remove pokemon.id from favorites list in localstorage
            let favList = JSON.parse(localStorage.getItem("favList"));
            if (favList.includes(pokemon.id)) {
                favList = favList.filter((id) => id !== pokemon.id);
                localStorage.setItem("favList", JSON.stringify(favList));
            }
        }
    }, [isFavorite]);

    const handleFavClick = () => {  
        setIsFavorite(!isFavorite);
    };

    return (
            <div className="grid-content-search-results-item">
                <div className="search-results-item-fav">
                    {favIcon}
                </div>
                <Link to={"/pokemon/" + pokemon?.id}>
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
                </Link>
            </div>
    );
}

export default SearchResultCard;
