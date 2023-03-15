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
            <button onClick={props.morePokemons} className="button-filter">Carregar mais</button>
        </div>
    );
}



function SearchResult(props) {
    const qtdPoke = 30;
    const [res, setRes] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [totalCount, setTotalCount] = React.useState(0);
    const [allPokemons, setAllPokemons] = React.useState([]);
    const [maxPokemons, setMax] = React.useState(0);

    async function getInitialPokemons() {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${0}&limit=${qtdPoke}`).then((res) =>
            res.json()
        );
        const pokemons = response.results;

        const newRes = [];
        for (let pokemon of pokemons) {
            const pokemonData = await fetch(pokemon.url).then((res) => res.json());
            newRes.push(<SearchResultCard key={pokemon.name} pokemonUrl={pokemon.url} />);
        }

        setRes(newRes);
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

        const newRes = res;
        for (let pokemon of pokemons) {
            newRes.push(<SearchResultCard key={pokemon.name} pokemonUrl={pokemon.url}/>);
        }

        setRes(newRes);
        setTotalCount(offset + diff);
        setOffset(offset + diff);
    }

    async function getSearchedPokemons(data) {
        const searchedPokemons = allPokemons.filter((poke) => poke.name.includes(data.toLowerCase()));

        setTotalCount(searchedPokemons.length);
        setMax(searchedPokemons.length);

        const newRes = []
        for (let pokemon of searchedPokemons) {
            newRes.push(<SearchResultCard key={pokemon.name} pokemonUrl={pokemon.url}/>);
        }
        setRes(newRes)
    }

    async function getAllPokemons() {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${maxPokemons}`).then((res) => res.json());
        setAllPokemons(response.results);
    }

    async function resetPage() {
        setRes(new Array(qtdPoke).fill().map((_, index) => <SearchResultCard key={index} />));

        const totalCount = await fetch("https://pokeapi.co/api/v2/pokemon").then((res) => res.json());
        setTotalCount(30);
        setOffset(30);
        setMax(totalCount.count);
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
            <h1>{maxPokemons + " Pokémon's encontrados"}</h1>
            <div className="grid-content-search-results">{res}</div>
            <EndOfList max={maxPokemons} morePokemons={getMorePokemons} qtdPokemon={totalCount}></EndOfList>
        </>
    );
}

export default SearchResult;
