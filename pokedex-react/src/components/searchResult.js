import React, {Suspense} from "react";
import SearchResultCard from "./searchResultCard";
import { getTotalCount } from "../services/search";

function SearchResult(props) {

    const [res, setRes] = React.useState([]);
    const [initId, setInitId] = React.useState(1);
    const [totalCount, setTotalCount] = React.useState(0);

    const loadingResultCard = (
        <div className="LoadingResultCard">
            <p>Carregando</p>
        </div>
    );

    function getSearchResults() {
        for(let i = initId; i < initId + 10; i++){
            setRes(res => [...res, <SearchResultCard pokemonId={i} />]);
        }
    }
    //Chamar getSearchResults() toda vez que o state initId mudar de valor
    React.useEffect(() => {
                getSearchResults();
    }, [initId]);

    //Chamar getTotalCount() apenas uma vez, quando o componente for montado
    React.useEffect(() => {
        getTotalCount().then(count => {
            setTotalCount(count);
        });

        const observer = new IntersectionObserver(handleFooterInView, { threshold: [0] });
        observer.observe(document.getElementById("footer"));
    }, []);

    const handleFooterInView = ((entries) => {
        if (entries[0].isIntersecting === true) {
            console.log("Footer is visible");
            setInitId(initId + 10);
        } else {
            console.log("Footer is not visible");
        }
    });

    return(
        <div className="grid-content-search-results">
            <h1>{totalCount + " Pokemons encontrados"}</h1>
            <Suspense fallback={loadingResultCard}>
            {res}
            </Suspense>
        </div>
    )
}

export default SearchResult;