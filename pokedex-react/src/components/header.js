import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import "../stylesheet/default.css";
import "../stylesheet/header.css";
import searchIcon from "../images/search_icon.png";

import header_image from "../images/header.png";

function Header(props) {
    const navigate = useNavigate();
    const [searchOpen, setSearchOpen] = useState(false);

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
        setSearchOpen(false);
    }

    function handleMobileButtonClick() {
        setSearchOpen(!searchOpen);
    }

    useEffect(() => {
        if (props.resetSearch) {
            document.getElementById("searchField").value = "";
        }
    }, [props.resetSearch]);

    useEffect(() => {
        if (searchOpen) {
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    setSearchOpen(false);
                }
            });
        } else {
            document.body.style.overflow = "unset";
            document.removeEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    setSearchOpen(false);
                }
            });
        }
    }, [searchOpen]);

    return (
        <>
            <div className="header grid-header">
                <Link to="/search" className="grid-header-logo">
                    <img className="header-img" src={header_image} alt="Header" />
                </Link>
                <div className="grid-header-nav"></div>
                {!searchOpen && (
                    <div className="grid-header-search-full">
                        <input
                            type="text"
                            id="searchField"
                            placeholder="Procurar"
                            onKeyDown={handleEnterPress}
                            value={props.searchPlaceholder}
                        />
                        <img className="header-search-icon" src={searchIcon} alt="Search" onClick={getSearch} />
                    </div>
                )}
                <div className="grid-header-mobile">
                    <div className="grid-header-search-mobile">
                        <MDBIcon fas icon="search" size="lg" onClick={handleMobileButtonClick} />
                    </div>
                </div>
            </div>
            {searchOpen && (
                <>
                    <div className="dimmed-background" onClick={handleMobileButtonClick}></div>
                    <dialog className="dialog-search-mobile" open>
                        <div className="dialog-search-mobile-input">
                            <input
                                type="text"
                                id="searchField"
                                placeholder="Procurar"
                                onKeyDown={handleEnterPress}
                                value={props.searchPlaceholder}
                                autoFocus
                            />
                            <img className="header-search-icon" src={searchIcon} alt="Search" onClick={getSearch} />
                        </div>
                    </dialog>
                </>
            )}
        </>
    );
}

export default Header;
