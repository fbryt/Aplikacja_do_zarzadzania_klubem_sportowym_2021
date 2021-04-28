import React from "react";
import Menu from "../menu/Menu";
import Footer from "../menu/Footer";
export default class NotFound extends React.Component{

    constructor(para) {
        super(para);
    }
    render(){
        return(
        <div>
            <Menu />
            <h1 style={{padding:"40px"}}>Oops - Something went wrong!</h1>
            <Footer />
        </div>
        )
    }
}

