import React from "react";
import "../stylesheet/default.css";
import "../stylesheet/footer.css";

function Footer(){
    return(
        <div className="grid-footer" id="footer">
            <p>Feito por:</p>
            <p>Matheus Rezende Milani Videira</p>
            <p>Vanessa de Cássia Alves</p>
            <p>Vitor de Almeida Recoaro</p>
            <p>Para a matéria de Desenvolvimento de Software para Web 2</p>
        </div>
    );
}

export default Footer;