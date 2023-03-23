import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import "../stylesheet/default.css";
import "../stylesheet/pokemon-page.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { getName } from "../services/search";
import { Link } from "react-router-dom";

var type_logo = process.env.PUBLIC_URL + "/types/";

var type_bg = process.env.PUBLIC_URL + "/background/";

function PokemonPage() {
    const [pokemonId, setPokemonId] = React.useState(null);
    const [pokemon, setPokemon] = React.useState(null);
    const [stats, setStats] = React.useState(null);
    const [flavorText, setFlavorText] = React.useState(null);
    const [sprite, setSprite] = React.useState(0);
    const [spriteList, setSpriteList] = React.useState(null);
    const [varieties, setVarieties] = React.useState([]);
    const [isFavorite, setIsFavorite] = React.useState(false);
    const [favIcon, setFavIcon] = React.useState(
            <MDBIcon far icon="heart" className="pokemon-favorite-icon" onClick={handleFavClick} />
    );
    const [isCardImageLoading, setIsCardImageLoading] = React.useState(true);
    const [isPokemonImageLoading, setIsPokemonImageLoading] = React.useState(true);
    const [isPokemonLoading, setIsPokemonLoading] = React.useState(true);

    const { id } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        setPokemonId(Number(id));
    }, [id]);

    React.useEffect(() => {
        setIsCardImageLoading(true);
        setIsPokemonImageLoading(true);
        setIsPokemonLoading(true);
        if (pokemonId !== null && pokemonId !== undefined) {
            fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
                .then((response) => response.json())
                .then(async (data) => {
                    setPokemon(data);
                })
                .catch((error) => {
                    console.log(error);
                    navigate("/404");
                });
        }
    }, [pokemonId]);

    React.useEffect(() => {
        getStats();
        getFlavorText();
        getSpriteList();
        getVarieties();
        if(localStorage.getItem("favList") !== null){
            const favorites = JSON.parse(localStorage.getItem("favList"));
            if(favorites.includes(pokemonId)){
                setIsFavorite(true);
            } else {
                setIsFavorite(false);
            }
        }
        setIsPokemonLoading(false);
    }, [pokemon]);

    React.useEffect(() => {
        if(pokemon !== null){
            if (isFavorite) {
            // Add pokemon.id to favorites list in localstorage
            let favList = JSON.parse(localStorage.getItem("favList"));
            if (!favList.includes(pokemon.id)) {
                favList.push(pokemon.id);
                localStorage.setItem("favList", JSON.stringify(favList));
            }
            setFavIcon(
                <MDBIcon fas icon="heart" className="pokemon-favorite-icon" onClick={handleFavClick} />
            )
        } else {
            // Remove pokemon.id from favorites list in localstorage
            let favList = JSON.parse(localStorage.getItem("favList"));
            if (favList.includes(pokemon.id)) {
                favList = favList.filter((id) => id !== pokemon.id);
                localStorage.setItem("favList", JSON.stringify(favList));
            }
            setFavIcon(
                <MDBIcon far icon="heart" className="pokemon-favorite-icon" onClick={handleFavClick} />
            )
        }}
    }, [isFavorite]);

    async function getVarieties() {
        const pokemonSpecie = await fetch(pokemon?.species.url).then((response) => response.json());
        let dataVarieties = [];
        for (let variety of pokemonSpecie.varieties) {
            const pokemonId = variety.pokemon.url.split("/")[6];
            const pokemonName = variety.pokemon.name;
            dataVarieties.push({ name: pokemonName, id: pokemonId });
        }

        setVarieties(dataVarieties);
    }

    function getStats() {
        setStats(
            pokemon?.stats.map((stat) => (
                <div key={stat.stat.name}>
                    <p>{stat.stat.name + ": " + stat.base_stat}</p>
                    <div className="stats-power-bar">
                        {stat.base_stat >= 20 ? (
                            <div className="stats-power-bar-fill"></div>
                        ) : (
                            <div className="stats-power-bar-empty"></div>
                        )}
                        {stat.base_stat >= 40 ? (
                            <div className="stats-power-bar-fill"></div>
                        ) : (
                            <div className="stats-power-bar-empty"></div>
                        )}
                        {stat.base_stat >= 60 ? (
                            <div className="stats-power-bar-fill"></div>
                        ) : (
                            <div className="stats-power-bar-empty"></div>
                        )}
                        {stat.base_stat >= 80 ? (
                            <div className="stats-power-bar-fill"></div>
                        ) : (
                            <div className="stats-power-bar-empty"></div>
                        )}
                        {stat.base_stat >= 100 ? (
                            <div className="stats-power-bar-fill"></div>
                        ) : (
                            <div className="stats-power-bar-empty"></div>
                        )}
                    </div>
                </div>
            ))
        );
    }

    function getFlavorText() {
        fetch(pokemon?.species.url)
            .then((response) => response.json())
            .then((data) => {
                const text = data.flavor_text_entries.filter((flavor) => flavor.language.name.includes("en"));

                setFlavorText(text[0].flavor_text);
            });
    }

    function extractUrlFromSprites(subfolder, sprites) {
        const list = [];
        if (sprites === null || typeof sprites !== "object" || sprites === undefined) {
            return list;
        }

        for (const [key, value] of Object.entries(sprites)) {
            if (value === null) {
                // Se o valor for nulo
                continue;
            } else if (typeof value === "string") {
                // Se o valor for uma string
                list.push([subfolder + key, value]);
            } else if (typeof value === "object" && value !== null) {
                // Se o valor for um objeto
                let subList = subfolder;
                if (key !== "versions" && key !== "other") {
                    if (subfolder !== "") subList += ": ";
                    subList += key;
                }
                list.push(...extractUrlFromSprites(subList, value));
            }
        }
        return list;
    }

    function getSpriteList() {
        setSprite(0);
        setSpriteList(extractUrlFromSprites("", pokemon?.sprites));
    }

    function handleSpritePrev() {
        if (sprite > 0) {
            setSprite(sprite - 1);
        } else {
            setSprite(spriteList.length - 1);
        }
        setIsCardImageLoading(true);
    }

    function handleSpriteNext() {
        if (sprite < spriteList.length - 1) {
            setSprite(sprite + 1);
        } else {
            setSprite(0);
        }
        setIsCardImageLoading(true);
    }

    function handlePokemonPrev() {
        if (pokemonId > 1 && pokemonId !== 10001) {
            navigate("/pokemon/" + (pokemonId - 1));
        } else {
            navigate("/pokemon/" + 1010);
        }
    }

    function handlePokemonNext() {
        if (pokemonId !== 1010) {
            navigate("/pokemon/" + (pokemonId + 1));
        } else {
            navigate("/pokemon/" + 10001);
        }
    }

    function handleFavClick() {
        // Toggle pokemon in favorites
        // favorites is saved in localstorage
        setIsFavorite(!isFavorite);
    }

    return (
        <div className="pokemon-page">
            <div className="grid-container">
                <Header />
                {pokemon ? (
                    <>
                        {isPokemonLoading &&
                        <div className="pokemon-skeleton">
                            <MDBIcon icon="spinner" className="pokemon-skeleton-spinner" spin size="4x"/>
                        </div>}
                        <div className="grid-image">
                            <img
                                className="pokedex-background"
                                src={type_bg + pokemon?.types[0].type.name + ".jpg"}
                                alt="Pokedex"
                            />
                            {isPokemonImageLoading && 
                                <div className="pokedex-pokemon-image-skeleton"></div>}
                            <img
                                className="pokedex-pokemon-image"
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                                alt="Pokemon"
                                onLoad={() => setIsPokemonImageLoading(false)}
                            />
                            <div className="pokedex-pokemon-floor"></div>
                            <button className="pokedex-pokemon-button pokedex-pokemon-prev" onClick={handlePokemonPrev}>
                                {"<"}
                            </button>
                            <button className="pokedex-pokemon-button pokedex-pokemon-next" onClick={handlePokemonNext}>
                                {">"}
                            </button>
                        </div>
                        <div className="grid-content">
                            <div className="grid-aside">
                                <h2>Stats:</h2>
                                <ul>{stats}</ul>
                            </div>
                            <div className="grid-content-inside">
                                <div className="grid-content-title">
                                    <h2>{"#" + pokemon.id + " " + pokemon.name}</h2>
                                    <div>
                                        {favIcon}
                                    </div>
                                </div>

                                <div className="grid-content-left">
                                    <div className="content-left-card">
                                        <h2>Sprites:</h2>
                                        {spriteList[sprite] && (
                                            <>
                                                <p>{spriteList[sprite][0]}</p>
                                                <div className="container-img">
                                                    <button
                                                        className="card-button card-prev"
                                                        onClick={handleSpritePrev}>
                                                        {"<"}
                                                    </button>
                                                    { isCardImageLoading &&
                                                        <div className="card-image-skeleton"></div>
                                                    }
                                                    <img
                                                        key={spriteList[sprite][0]}
                                                        className="card-image"
                                                        src={spriteList[sprite][1]}
                                                        alt="Card"
                                                        onLoad={() => setIsCardImageLoading(false)}
                                                    />
                                                    <button
                                                        className="card-button card-next"
                                                        onClick={handleSpriteNext}>
                                                        {">"}
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="grid-content-right">
                                    <div>
                                        <h2>Descrição:</h2>
                                        <p>{flavorText}</p>
                                    </div>
                                    <div>
                                        <h2>Tipos:</h2>
                                        <div className="pokemon-types">
                                        {pokemon?.types.map((type) => (
                                            <img
                                                key={type.type.name}
                                                className="content-title-properties"
                                                src={type_logo + type.type.name + ".png"}
                                                alt="Type"
                                            />
                                        ))}
                                    </div>
                                    </div>
                                    <div>
                                        <div className="weight-height">
                                            <p className="weight">Peso: {pokemon?.weight}</p>
                                            <p className="height">Altura: {pokemon?.height}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid-right">
                                <h2>Habilidades</h2>
                                <ul>
                                    {pokemon?.abilities.map((ability) => (
                                        <li key={ability.ability.name}>{ability.ability.name}</li>
                                    ))}
                                </ul>
                                { pokemon?.held_items.length > 0 && <>
                                    <h2>Itens:</h2>
                                <ul>
                                    {pokemon?.held_items.map((item) => (
                                        <li key={item.item.name}>{item.item.name}</li>
                                    ))}
                                </ul>
                                </>}
                                { varieties.length > 1 && <>
                                <h2>Variantes:</h2>
                                        <ul>
                                            {varieties.map((variety) => (
                                                pokemon?.name !== variety.name && <li key={variety.name}>
                                                    <Link className="variety-link" key={variety.name + "link"} to={"/pokemon/" + variety.id}>
                                                        {variety.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul> </>}
                            </div>
                        </div>{" "}
                    </>
                ) : (
                    <div className="search-skeleton-item-img"></div>
                )}
                <Footer />
            </div>
        </div>
    );
}

export default PokemonPage;
