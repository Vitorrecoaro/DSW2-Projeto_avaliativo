import React, { Suspense } from "react";
import "../stylesheet/default.css";
import "../stylesheet/search-page.css";
import Header from "../components/header";
import SearchFilter from "../components/searchFilter";
import Footer from "../components/footer";
import SearchResult from "../components/searchResult";

import SearchResultCard from "../components/searchResultCard"; 

function Search() {

    return (
        <div className="search-page">
            <div className="grid-container">
                <Header />
                <SearchFilter />
                <div className="grid-content">
                    <div className="grid-content-search">
                        <Suspense fallback={<div>Carregando</div>}>
                            <SearchResult />
                        </Suspense>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Search;