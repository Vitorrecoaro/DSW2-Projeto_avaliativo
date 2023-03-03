import React from "react";
import "../stylesheet/landing.css";
import header_image from "../images/header.png";
import bg from "../images/bg.png";
import search_icon from "../images/search_icon.png";

function Landing() {
    const [pokeballOpen, setPokeballOpen] = React.useState(false);

    function handlePokeballClick() {
        setPokeballOpen(!pokeballOpen);
    }

    

    return (
        <div className="landing">
            <div className="pokeball">
                <div className={"pokeball-top " + (pokeballOpen && "pokeball-top-open")} id="pokeball-top"></div>
                <div className={"pokeball-middle " + (pokeballOpen && "pokeball-middle-open")} id="button" onClick={handlePokeballClick}></div>
                <div className={"pokeball-bottom " + (pokeballOpen && "pokeball-bottom-open")} id="pokeball-bottom"></div>
                <div className={"content " + (pokeballOpen && "content-open")} id="content">
                    <img className="logo" src={header_image}alt="Logo" />
                    <div className="search">
                        <input type="text" placeholder="Procurar" />
                        <img className="header-search-icon" src={search_icon} alt="Search" />
                        <a href="search.html" className="list-button">Listar Todos</a>
                    </div>
                </div>
            </div>
            <img className="background" src={bg} alt="Background" />
        </div>
    );
}

export default Landing;