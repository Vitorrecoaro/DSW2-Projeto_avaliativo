import React, { Suspense, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../stylesheet/default.css";
import "../stylesheet/search-page.css";
import Header from "../components/header";
import SearchFilter from "../components/searchFilter";
import Footer from "../components/footer";
import SearchResult from "../components/searchResult";
import Scroll from "../components/scroll";

export default function Search() {
    const [search, setSearch] = React.useState(null);
    const { searchParam } = useParams();
    const [resetSearch, setReset] = React.useState(false);

    useEffect(() => {
        if (searchParam !== undefined) {
            setSearch(searchParam);
            setReset(false);
        } else {
            setReset(true);
            setSearch(null);
        }
    }, [searchParam]);

    return (
        <div className="search-page">
            <div className="grid-container">
                <Header resetSearch={resetSearch} />
                <SearchFilter />
                <div className="grid-content">
                    <div className="grid-content-search">
                        <Suspense fallback={<div>Carregando</div>}>
                            <SearchResult search={search} />
                        </Suspense>
                        <Scroll />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
