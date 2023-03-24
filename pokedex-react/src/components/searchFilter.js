import React from "react";
import { MDBIcon } from "mdb-react-ui-kit";

import "../stylesheet/default.css";
import "../stylesheet/search-page.css";

function SearchFilter() {
    return (
        <div className="grid-search-filter">
            <label id="label-dropdown-navbar-menu" htmlFor="checkbox-dropdown-navbar-menu">
                <MDBIcon fas icon="filter" size="lg" className="navbar-menu-icon" />
            </label>
            <input type="checkbox" id="checkbox-dropdown-navbar-menu" />
            <div className="search-categories">
                <div className="filter">
                    <label htmlFor="filter-type">Tipo:</label>
                    <select id="filter-type" name="filter-type" defaultValue="">
                        <option value="">Todos</option>
                        <option value="Aço">Aço</option>
                        <option value="Água">Água</option>
                        <option value="Dragão">Dragão</option>
                        <option value="Elétrico">Elétrico</option>
                        <option value="Escuridão">Escuridão</option>
                        <option value="Fada">Fada</option>
                        <option value="Fantasma">Fantasma</option>
                        <option value="Fogo">Fogo</option>
                        <option value="Gelo">Gelo</option>
                        <option value="Grama">Grama</option>
                        <option value="Inseto">Inseto</option>
                        <option value="Lutador">Lutador</option>
                        <option value="Normal">Normal</option>
                        <option value="Pedra">Pedra</option>
                        <option value="Psíquico">Psíquico</option>
                        <option value="Terra">Terra</option>
                        <option value="Veneno">Veneno</option>
                        <option value="Voador">Voador</option>
                    </select>
                </div>
                <div className="filter">
                    <label htmlFor="filter-generation">Geração:</label>
                    <select id="filter-generation" name="filter-generation" defaultValue="">
                        <option value="">Todas</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                </div>
                <input type="button" className="button-filter" value="Filtrar" />
            </div>
        </div>
    );
}

export default SearchFilter;
