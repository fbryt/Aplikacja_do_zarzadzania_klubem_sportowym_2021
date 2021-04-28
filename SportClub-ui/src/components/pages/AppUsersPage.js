import React, {Component, useEffect, useState} from "react";

import Menu from "../menu/Menu";
import Footer from "../menu/Footer";
import axios from "axios";
import AppUser from "../AppUser";

const array = [{name: "John", sex:"Male"}, {name: "Johnny", sex:"Maleee"}];
const url = "http://localhost:8080/appUsers";

export const AppUserPage = ()=>{

    const [data, setData] = useState([]);
    useEffect(async ()=>{
        
        await axios.get(url).then(response=>{
            setData(response.data._embedded.appUserList);
        }).catch(error=>{
            console.log(error);
        });

    }, []);
    console.log(data);
    return(
        <div>
           <Menu />
           {
               data.map((user)=>{
                return <AppUser key={user.id} user={user}/>
               })
           }
            
           <Footer />
        </div>
    )    
}

export default AppUserPage;