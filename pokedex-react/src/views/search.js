import React, { Suspense } from "react";
import "../stylesheet/default.css";
import "../stylesheet/search-page.css";
import Header from "../components/header";
import SearchFilter from "../components/searchFilter";
import Footer from "../components/footer";
import SearchResult from "../components/searchResult";

export default function Search() {
    const [search, setSearch] = React.useState(null);

    function getSearch(data) {
        if (data === "") {
            setSearch(null);
        } else {
            setSearch(data);
        }
    }

    return (
        <div className="search-page">
            <div className="grid-container">
                <Header onSearch={getSearch} />
                <SearchFilter />
                <div className="grid-content">
                    <div className="grid-content-search">
                        <Suspense fallback={<div>Carregando</div>}>
                            <SearchResult search={search} />
                        </Suspense>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
