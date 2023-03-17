import React from 'react';
import { MDBBtn, MDBContainer, MDBIcon } from 'mdb-react-ui-kit';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "../stylesheet/scroll.css";

function Scroll() {
  let mybutton;

  window.onscroll = function () {
    mybutton = document.getElementById("btn-back-to-top");
    scrollFunction(mybutton);
  };

  function scrollFunction(mybutton) {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <MDBContainer fluid>

      <MDBBtn onClick={backToTop} id='btn-back-to-top' 
        style={{
          position: "fixed",
          bottom: "5rem",
          right: "20px",
          display: "none",
        }} 
        className='btn-floating' 
        color='danger' 
        size='lg'>
        <MDBIcon fas icon="arrow-up" />
      </MDBBtn>

      <link
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        rel="stylesheet"
        />
      <link
        href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
        rel="stylesheet"
        />


    </MDBContainer>
  );
}

export default Scroll;
