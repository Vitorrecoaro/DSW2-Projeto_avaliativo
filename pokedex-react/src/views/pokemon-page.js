import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../stylesheet/default.css";
import "../stylesheet/pokemon-page.css";
import Header from "../components/header";
import Footer from "../components/footer";
import pokedexWpp from "../images/pokedexwpp.jpg";
import fundoCarta from "../images/fundo_carta.png";

var type_logo = process.env.PUBLIC_URL + "/types/";

var type_bg = process.env.PUBLIC_URL + "/background/";

function PokemonPage() {
    const [pokemonId, setPokemonId] = React.useState(null);
    const [pokemon, setPokemon] = React.useState(null);
    const [stats, setStats] = React.useState(null);
    const [flavorText, setFlavorText] = React.useState(null);
    const [sprite, setSprite] = React.useState(0);
    const [spriteList, setSpriteList] = React.useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        setPokemonId(Number(id));
    }, [id]);

    React.useEffect(() => {
        if(pokemonId !== null && pokemonId !== undefined){
        fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
            .then((response) => response.json())
            .then((data) => {
                setPokemon(data);
            });
        }
    }, [pokemonId]);

    React.useEffect(() => {
        getStats();
        getFlavorText();
        getSpriteList();
    }, [pokemon]);

    function getStats() {
        setStats(pokemon?.stats.map((stat) => (
            <div>
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
        )))
    }

    function getFlavorText() {
        fetch(pokemon?.species.url).then((response) => response.json()).then((data) => {
            const text = data.flavor_text_entries.filter((flavor) => flavor.language.name.includes("en"));

            setFlavorText(text[0].flavor_text);
        });
    }


    function extractUrlFromSprites(subfolder, sprites) {
        const list = [];
        if (sprites === null || typeof sprites !== 'object' || sprites === undefined) {
            return list;
        }

        for (const [key, value] of Object.entries(sprites)) {
            if (value === null) {
                // Se o valor for nulo
                continue;
            } else if (typeof value === 'string') {
                // Se o valor for uma string
                list.push([subfolder + key, value]);
            } else if (typeof value === 'object' && value !== null) {
                // Se o valor for um objeto
                let sublist = subfolder;
                if(key !== "versions" && key !== "other") {
                    if(subfolder !== "")
                        sublist += ": ";
                    sublist += key;
                }
                list.push(...extractUrlFromSprites(sublist, value));
            }
        }
        return list;
    }

    function getSpriteList() {
        setSprite(0);
        setSpriteList(extractUrlFromSprites("",pokemon?.sprites));
    }

    function handleSpritePrev() {
        if (sprite > 0) {
            setSprite(sprite - 1);
        } else {
            setSprite(spriteList.length - 1);
        }
    }

    function handleSpriteNext() {
        if (sprite < spriteList.length) {
            setSprite(sprite + 1);
        } else {
            setSprite(0);
        }
    }

    function handlePokemonPrev() {
        if (pokemonId > 1) {
            navigate("/pokemon/" + (pokemonId - 1));
        }        
    }

    function handlePokemonNext() {
            navigate("/pokemon/" + (pokemonId + 1));
    }


    return (
        <div className="pokemon-page">
            <div className="grid-container">
                <Header />
                {pokemon ? (<>
                    <div className="grid-image">
                        <img className="pokedex-background" src={type_bg + pokemon?.types[0].type.name + ".jpg"} alt="Pokedex" />
                        <img className="pokedex-pokemon-image"
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                            alt="Pokemon" />
                        <div className="pokedex-pokemon-floor"></div>
                        <button className="pokedex-pokemon-button pokedex-pokemon-prev" onClick={handlePokemonPrev}>{"<"}</button>
                        <button className="pokedex-pokemon-button pokedex-pokemon-next" onClick={handlePokemonNext}>{">"}</button>
                    </div>
                    <div className="grid-content">
                        <div className="grid-aside">
                            <h2>Stats:</h2>
                            <ul>
                                {stats}
                            </ul>
                        </div>
                        <div className="grid-content-inside">
                            <div className="grid-content-title">
                                <h2>{"#" + pokemon.id + " " + pokemon.name}</h2>
                                <div className="pokemon-types">
                                    {pokemon?.types.map((type) => (
                                        <img className="content-title-properties" src={type_logo + type.type.name + ".png"} alt="Type" />
                                    ))}
                                </div>
                            </div>

                            <div className="grid-content-left">
                                <div className="content-left-card">
                                    <h2>Sprites:</h2>
                                    <img className="card-background" src={fundoCarta} alt="Card" />
                                    {spriteList[sprite] && (
                                        <>
                                            <p>{spriteList[sprite][0]}</p>
                                            <img className="card-image" src={spriteList[sprite][1]} alt="Card" />
                                        </>
                                    )}
                                    <button className="card-button card-prev" onClick={handleSpritePrev}>{"<"}</button>
                                    <button className="card-button card-next" onClick={handleSpriteNext}>{">"}</button>
                                </div>
                            </div>

                            <div className="grid-content-right">
                                <div>
                                    <h2>Descrição:</h2>
                                    <p>{flavorText}</p>
                                </div>
                                <div>
                                    <h2>Variantes:</h2>
                                    <ul>
                                        {pokemon?.forms.map((form) => (
                                            <li>{form.name}</li>
                                        ))}
                                    </ul>
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
                                    <li>{ability.ability.name}</li>
                                ))}
                            </ul>
                            <h2>Itens:</h2>
                            <ul>
                                {pokemon?.held_items.map((item) => (
                                    <li>{item.item.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div> </>) : (
                        <div className="search-skeleton-item-img"></div>
                    )}
                <Footer />
            </div>
        </div>
    )
}

export default PokemonPage;