import React from 'react';
import { render, unmountComponentAtNode, ReactDOM } from 'react-dom';
import { Router, BrowserRouter } from "react-router-dom";
import { cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Dashboard from '../pages/DashboardPage';




describe('Testing menu coach', () => {

    let encrypted;

    let wrapper = null
    const spyNavigate = jest.fn()

    var CryptoJS = require("crypto-js");
    encrypted = CryptoJS.AES.encrypt("COACH", "Secret");

    document.cookie = `role=${encrypted}`;

    it('renders without crashing', async () => {

        const root = document.createElement('div');
        document.body.appendChild(root);
        render(
            <BrowserRouter>
                <Dashboard required={true} location={{ hash: "", pathname: "/dashboard", search: "", state: undefined }} match={{ isExact: true, path: "/dashboard", url: "/dashboard" }} />
            </BrowserRouter>, root
        );
        expect(document.body.textContent).toContain('HomeScheduleContractCoach toolsAccount');
    })

})
