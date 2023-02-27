import React from "react";
import "../stylesheet/default.css";
import "../stylesheet/search-page.css";
import Header from "../components/header";
import SearchFilter from "../components/searchFilter";
import Footer from "../components/footer";
import pokedexwpp from "../images/pokedexwpp.jpg";

function Search() {

    return (
        <div className="search-page">
            <div className="grid-container">
                <Header />
                <SearchFilter />
                <div class="grid-content">
                    <div class="grid-content-search">
                        <div class="grid-content-search-results">
                            <a href="charizard.html">
                                <div class="grid-content-search-results-item">
                                    <img class="search-results-item-img-bg" src={pokedexwpp} alt="Pokedex" />
                                    <img
                                        class="search-results-item-img"
                                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
                                        alt="Charizard" />
                                    <div class="search-results-item-info">
                                        <h2>Charizard</h2>
                                        <p>#6</p>
                                        <p>Fogo</p>
                                        <p>Geração 1</p>
                                    </div>
                                </div>
                            </a>
                            <a href="#">
                                <div class="grid-content-search-results-item">
                                    <img class="search-results-item-img-bg" src={pokedexwpp} alt="Pokedex" />
                                    <img
                                        class="search-results-item-img"
                                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
                                        alt="Ditto" />
                                    <div class="search-results-item-info">
                                        <h2>Ditto</h2>
                                        <p>#132</p>
                                        <p>Normal</p>
                                        <p>Geração 1</p>
                                    </div>
                                </div>
                            </a>
                            <a href="#">
                                <div class="grid-content-search-results-item">
                                    <img class="search-results-item-img-bg" src={pokedexwpp} alt="Pokedex" />
                                    <img
                                        class="search-results-item-img"
                                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
                                        alt="Squirtle" />
                                    <div class="search-results-item-info">
                                        <h2>Squirtle</h2>
                                        <p>#7</p>
                                        <p>Água</p>
                                        <p>Geração 1</p>
                                    </div>
                                </div>
                            </a>
                            <a href="#">
                                <div class="grid-content-search-results-item">
                                    <img class="search-results-item-img-bg" src={pokedexwpp} alt="Pokedex" />
                                    <img
                                        class="search-results-item-img"
                                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png"
                                        alt="Mewtwo" />
                                    <div class="search-results-item-info">
                                        <h2>Mewtwo</h2>
                                        <p>#150</p>
                                        <p>Psíquico</p>
                                        <p>Geração 1</p>
                                    </div>
                                </div>
                            </a>
                            <a href="#">
                                <div class="grid-content-search-results-item">
                                    <img class="search-results-item-img-bg" src={pokedexwpp} alt="Pokedex" />
                                    <img
                                        class="search-results-item-img"
                                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                                        alt="Pikachu" />
                                    <div class="search-results-item-info">
                                        <h2>Pikachu</h2>
                                        <p>#25</p>
                                        <p>Elétrico</p>
                                        <p>Geração 1</p>
                                    </div>
                                </div>
                            </a>
                            <a href="#">
                                <div class="grid-content-search-results-item">
                                    <img class="search-results-item-img-bg" src={pokedexwpp} alt="Pokedex" />
                                    <img
                                        class="search-results-item-img"
                                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png"
                                        alt="Eevee" />
                                    <div class="search-results-item-info">
                                        <h2>Eevee</h2>
                                        <p>#133</p>
                                        <p>Normal</p>
                                        <p>Geração 1</p>
                                    </div>
                                </div>
                            </a>
                            <a href="#">
                                <div class="grid-content-search-results-item">
                                    <img class="search-results-item-img-bg" src={pokedexwpp} alt="Pokedex" />
                                    <img
                                        class="search-results-item-img"
                                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/404.png"
                                        alt="Luxio" />
                                    <div class="search-results-item-info">
                                        <h2>Luxio</h2>
                                        <p>#404</p>
                                        <p>Elétrico</p>
                                        <p>Geração 4</p>
                                    </div>
                                </div>
                            </a>
                            <a href="#">
                                <div class="grid-content-search-results-item">
                                    <img class="search-results-item-img-bg" src={pokedexwpp} alt="Pokedex" />
                                    <img
                                        class="search-results-item-img"
                                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/78.png"
                                        alt="Rapidash" />
                                    <div class="search-results-item-info">
                                        <h2>Rapidash</h2>
                                        <p>#78</p>
                                        <p>Fogo</p>
                                        <p>Geração 1</p>
                                    </div>
                                </div>
                            </a>
                            <a href="#">
                                <div class="grid-content-search-results-item">
                                    <img class="search-results-item-img-bg" src={pokedexwpp} alt="Pokedex" />
                                    <img
                                        class="search-results-item-img"
                                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/523.png"
                                        alt="Zebstrika" />
                                    <div class="search-results-item-info">
                                        <h2>Zebstrika</h2>
                                        <p>#523</p>
                                        <p>Elétrico</p>
                                        <p>Geração 5</p>
                                    </div>
                                </div>
                            </a>
                            <a href="#">
                                <div class="grid-content-search-results-item">
                                    <img class="search-results-item-img-bg" src={pokedexwpp} alt="Pokedex" />
                                    <img
                                        class="search-results-item-img"
                                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png"
                                        alt="Garchomp" />
                                    <div class="search-results-item-info">
                                        <h2>Garchomp</h2>
                                        <p>#445</p>
                                        <p>Dragão</p>
                                        <p>Geração 5</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Search;