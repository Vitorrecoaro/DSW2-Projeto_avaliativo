import React from "react";
import "../stylesheet/default.css";
import "../stylesheet/header.css";

import header_image from "../images/header.png";

function Header() {
    return(
        <div className="header grid-header">
            <a class="grid-header-logo" href="index.html">
                <img class="header-img" src={header_image} alt="Header" />
            </a>
            <div class="grid-header-nav"></div>
            <div class="grid-header-search-full">
                <input type="text" placeholder="Procurar" />
                <img class="header-search-icon" src="images/search_icon.png" alt="Search" />
            </div>
            <div class="grid-header-mobile">
                <div class="grid-header-search-mobile">
                    <img class="header-search-icon" src="images/search_icon.png" alt="Search" />
                </div>
            </div>
        </div>
    );
}

export default Header;