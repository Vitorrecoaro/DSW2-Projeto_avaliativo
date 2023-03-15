import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheet/landing.css";
import header_image from "../images/header.png";
import bg from "../images/bg.png";
import search_icon from "../images/search_icon.png";

function Landing() {
    const [pokeballOpen, setPokeballOpen] = React.useState(false);
    const navigate = useNavigate();

    function handlePokeballClick() {
        setPokeballOpen(!pokeballOpen);
    }

    function handleSearchFieldEnter(event) {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    function handleSearch(){
        const search = document.getElementById("search-field").value;
        navigate("/search/" + search);
    }

    React.useEffect(() => {
            setTimeout(() => {
                setPokeballOpen(true);
            }, 500);
    }, []);

    return (
        <div className="landing">
            <div className="pokeball">
                <div className={"pokeball-top " + (pokeballOpen && "pokeball-top-open")} id="pokeball-top"></div>
                <div className={"pokeball-middle " + (pokeballOpen && "pokeball-middle-open")} id="button" onClick={handlePokeballClick}></div>
                <div className={"pokeball-bottom " + (pokeballOpen && "pokeball-bottom-open")} id="pokeball-bottom"></div>
                <div className={"content " + (pokeballOpen && "content-open")} id="content">
                    <img className="logo" src={header_image}alt="Logo" />
                    <div className="search">
                        <input type="text" id="search-field" placeholder="Procurar" onKeyDown={handleSearchFieldEnter}/>
                        <img className="header-search-icon" src={search_icon} onClick={handleSearch}alt="Search" />
                        <Link to="search" className="list-button">Listar Todos</Link>
                    </div>
                </div>
            </div>
            <img className="background" src={bg} alt="Background" />
        </div>
    );
}

export default Landing;