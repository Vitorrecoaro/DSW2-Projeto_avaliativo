import React from "react";
import {Link, useNavigate} from "react-router-dom";
import "../stylesheet/default.css";
import "../stylesheet/header.css";
import searchIcon from "../images/search_icon.png";

import header_image from "../images/header.png";

function Header(props) {
    const navigate = useNavigate();

    function getSearch() {
        const search = document.getElementById("searchField").value;

        onSearch(search);
    }

    function handleEnterPress(event) {
        if (event.key === "Enter") {
            const search = document.getElementById("searchField").value;

            onSearch(search);
        }
    }

    function onSearch(data) {
        if (data === "") {
            navigate("/search");
        } else {
            navigate("/search/" + data);
        }
    }


    return (
        <div className="header grid-header">
            <Link to="/" className="grid-header-logo">
                <img className="header-img" src={header_image} alt="Header" />
            </Link>
            <div className="grid-header-nav"></div>
            <div className="grid-header-search-full">
                <input type="text" id="searchField" placeholder="Procurar" onKeyDown={handleEnterPress} value={props.searchPlaceholder}/>
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
