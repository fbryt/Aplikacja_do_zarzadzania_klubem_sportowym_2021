import React from 'react';
import { render, unmountComponentAtNode, ReactDOM  }  from 'react-dom';
import { Router ,BrowserRouter } from "react-router-dom";
import { cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Dashboard from '../pages/DashboardPage';
import {Cookies} from "react-cookie";
import jwt_decode from "jwt-decode";




describe('Testing menu admin', () => {
    const cookie=new Cookies();

    let encrypted;

    let wrapper = null
    const spyNavigate = jest.fn()

    var CryptoJS=require("crypto-js");
    encrypted=CryptoJS.AES.encrypt("ADMIN","Secret");
    document.cookie=`role=${encrypted}`;

    it('renders without crashing', async () => {

        const root = document.createElement('div');
        document.body.appendChild(root);
        render(
            <BrowserRouter>
                <Dashboard required={true} location={{hash:"",pathname:"/dashboard",search:"",state:undefined}} match={{isExact: true, path: "/dashboard", url: "/dashboard"}}/>
            </BrowserRouter>,root
        );
        expect(document.body.textContent).toContain('B&B SportHomeScheduleContractAdmin toolsConnect players with CoachAccount');
    })

})
