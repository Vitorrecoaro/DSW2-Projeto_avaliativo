import React, { Suspense, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../stylesheet/default.css";
import "../stylesheet/search-page.css";
import Header from "../components/header";
import SearchFilter from "../components/searchFilter";
import Footer from "../components/footer";
import SearchResult from "../components/searchResult";

export default function Search() {
    const [search, setSearch] = React.useState(null);
    const { searchParam } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (searchParam !== undefined) {
            setSearch(searchParam);
        } else {
            setSearch(null);
        }
    }, [searchParam]);


    return (
        <div className="search-page">
            <div className="grid-container">
                <Header />
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
