import React from "react";
import "../stylesheet/default.css";
import "../stylesheet/header.css";
import searchIcon from "../images/search_icon.png";

import header_image from "../images/header.png";

function Header(props) {
    function getSearch() {
        const search = document.getElementById("searchField").value;

        props.onSearch(search);
    }

    function handleEnterPress(event) {
        if (event.key === "Enter") {
            const search = document.getElementById("searchField").value;

            props.onSearch(search);
        }
    }

    return (
        <div className="header grid-header">
            <a className="grid-header-logo" href="index.html">
                <img className="header-img" src={header_image} alt="Header" />
            </a>
            <div className="grid-header-nav"></div>
            <div className="grid-header-search-full">
                <input type="text" id="searchField" placeholder="Procurar" onKeyDown={handleEnterPress} />
                <img className="header-search-icon" src={searchIcon} alt="Search" onClick={getSearch} />
            </div>
            <div className="grid-header-mobile">
                <div className="grid-header-search-mobile">
                    <img className="header-search-icon" src="../images/search_icon.png" alt="Search" />
                </div>
            </div>
        </div>
    );
}

export default Header;
