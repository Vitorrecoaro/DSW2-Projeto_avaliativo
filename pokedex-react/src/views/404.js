import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "../stylesheet/404.css";

function NotFound() {
    return (
        <div className="not-found">
            <Header />
            <div className="not-found-content">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10085.png" 
                     alt="404" 
                     className="not-found-image"/>
                <div className="not-found-content-text">
                <h1>404</h1>
                <h2>Página não encontrada</h2>
                <p>A página que procura não existe.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
    }

export default NotFound;