import React from "react";
import SearchResultCard from "./searchResultCard";
import "../stylesheet/searchResult.css";
import { useNavigate } from "react-router-dom";

function EndOfList(props) {
    if (props.qtdPokemon >= props.max) {
        return (
            <div className="grid-bottom">
                <h4>Não há mais Pokémons</h4>
            </div>
        );
    }
    return (
        <div className="grid-bottom">
            <button onClick={props.morePokemons} className="button-filter">
                Carregar mais
            </button>
        </div>
    );
}

function SearchResult(props) {
    const qtdPoke = 30;
    const [res, setRes] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [totalCount, setTotalCount] = React.useState(0);
    const [filterCount, setFilterCount] = React.useState(0);
    const [totalDisplayed, setTotalDisplayed] = React.useState(0);
    const [allPokemons, setAllPokemons] = React.useState([]);
    const [isFiltered, setFiltered] = React.useState(false);
    const navigate = useNavigate();

    function generateResult(list, qtd) {
        setRes(
            list
                .slice(0, qtd)
                .map((pokemon) => (
                    <SearchResultCard
                        key={pokemon.name}
                        pokemonUrl={pokemon.url}
                        typeFilter={props.typeFilter}
                        generationFilter={props.generationFilter}
                    />
                ))
        );
    }

    React.useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=1`)
            .then((res) => res.json())
            .then((data) => {
                setTotalCount(data.count);
                setFilterCount(data.count);
            });
        // if localstorage favList is empty, create it
        if (localStorage.getItem("favList") === null) {
            localStorage.setItem("favList", JSON.stringify([]));
        }
    }, []);

    React.useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalCount}`)
            .then((res) => res.json())
            .then((data) => {
                setAllPokemons(data.results);
            });
    }, [totalCount]);

    React.useEffect(() => {
        if (props.search !== null) {
            const filter = allPokemons.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(props.search.toLowerCase())
            );
            setFilterCount(filter.length);
            setTotalDisplayed(filter.length);
            setFiltered(true);
            generateResult(filter, qtdPoke);
        } else {
            generateResult(allPokemons, qtdPoke);
            setTotalDisplayed(qtdPoke);
            setFilterCount(totalCount);
            setFiltered(false);
        }
    }, [props.search, allPokemons]);

    React.useEffect(() => {
        if (props.search !== null) {
            const filter = allPokemons.filter((pokemon) => pokemon.name.includes(props.search));
            generateResult(filter, offset + qtdPoke);
        } else {
            generateResult(allPokemons, offset + qtdPoke);
        }
    }, [offset]);

    function getMorePokemons() {
        setOffset(offset + qtdPoke);
        setTotalDisplayed(totalDisplayed + qtdPoke);
    }

    async function getFavoritePokemons() {
        const favList = JSON.parse(localStorage.getItem("favList"));
        const pokemonList = [];
        setFilterCount(favList.length);

        for (let id of favList) {
            pokemonList.push(allPokemons.at(id - 1));
        }

        setFiltered(true);
        generateResult(pokemonList, pokemonList.length);
    }

    function resetPage() {
        setFilterCount(totalCount);
        setFiltered(false);
        generateResult(allPokemons, qtdPoke);
        navigate("/search");
    }

    function displayBackButton() {
        if (isFiltered) {
            return (
                <button className="back-button" onClick={resetPage}>
                    {"< Voltar a todos pokemons"}
                </button>
            );
        }
    }

    return (
        <>
            {props.search !== null && <h1>{"Filtrando por: " + props.search}</h1>}
            {displayBackButton()}
            <div className="header-search">
                <h1>
                    {filterCount +
                        " Pokémon" +
                        (filterCount > 1 ? "'s" : "") +
                        " encontrado" +
                        (filterCount > 1 ? "s" : "")}
                </h1>
                <button className="button-filter" onClick={getFavoritePokemons}>
                    Pokemons favoritos
                </button>
            </div>
            <div className="grid-content-search-results">{res}</div>
            <EndOfList max={filterCount} morePokemons={getMorePokemons} qtdPokemon={totalDisplayed}></EndOfList>
        </>
    );
}

export default SearchResult;
