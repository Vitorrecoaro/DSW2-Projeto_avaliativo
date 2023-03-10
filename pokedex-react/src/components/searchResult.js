import React from "react";
import SearchResultCard from "./searchResultCard";
import "../stylesheet/searchResult.css";

function EndOfList(props) {
    if (props.qtdPokemon === props.max) {
        return (
            <div className="grid-bottom">
                <h4>Não há mais Pokémons</h4>
            </div>
        );
    }
    return (
        <div className="grid-bottom">
            <button onClick={props.morePokemons}>Carregar mais</button>
        </div>
    );
}

function SearchResult(props) {
    const qtdPoke = 30;
    const [res, setRes] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [totalCount, setTotalCount] = React.useState(0);
    const [allPokemons, setAllPokemons] = React.useState([]);
    const [maxPokemons, setMax] = React.useState(1010);

    async function getInitialPokemons() {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${0}&limit=${qtdPoke}`).then((res) =>
            res.json()
        );
        const pokemons = response.results;

        for (let pokemon of pokemons) {
            setRes((res) => [...res, <SearchResultCard key={pokemon.name} pokemonUrl={pokemon.url} />]);
        }
    }

    async function getMorePokemons() {
        let diff = qtdPoke;

        if (diff + totalCount > maxPokemons) {
            diff = maxPokemons - totalCount;
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${diff}`).then((res) =>
            res.json()
        );
        const pokemons = response.results;

        for (let pokemon of pokemons) {
            setRes((res) => [...res, <SearchResultCard key={pokemon.name} pokemonUrl={pokemon.url} />]);
        }

        setTotalCount(offset + diff);
        setOffset(offset + diff);
    }

    async function getSearchedPokemons(data) {
        const searchedPokemons = allPokemons.filter((poke) => poke.name.includes(data.toLowerCase()));

        setTotalCount(searchedPokemons.length);
        setMax(searchedPokemons.length);

        for (let pokemon of searchedPokemons) {
            setRes((res) => [...res, <SearchResultCard key={pokemon.name} pokemonUrl={pokemon.url} />]);
        }
    }

    async function getAllPokemons() {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1008").then((res) => res.json());
        setAllPokemons(response.results);
    }

    function resetPage() {
        setRes([]);
        setTotalCount(30);
        setOffset(30);
        setMax(1010);
        getInitialPokemons();
    }

    React.useEffect(() => {
        if (props.search === null) {
            resetPage();
        } else {
            setRes([]);
            getSearchedPokemons(props.search);
        }
    }, [props.search]);

    React.useEffect(() => {
        getAllPokemons();
    }, []);

    return (
        <>
            <h1>{totalCount + " Pokémon's encontrados"}</h1>
            <div className="grid-content-search-results">{res}</div>
            <EndOfList max={maxPokemons} morePokemons={getMorePokemons} qtdPokemon={totalCount}></EndOfList>
        </>
    );
}

export default SearchResult;
