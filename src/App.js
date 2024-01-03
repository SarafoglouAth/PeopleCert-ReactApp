import Nav from "../src/Nav/Nav"
import "primereact/resources/primereact.css";                  //core css
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import React from "react";
import Footer from "./Footer/Footer";

function  App() {
    return (
        <div>
            <Nav/>
            <Footer/>
        </div>
    )
}
export default App;

