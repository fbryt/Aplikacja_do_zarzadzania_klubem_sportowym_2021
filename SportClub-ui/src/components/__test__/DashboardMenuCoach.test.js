import React from 'react';
import { render, unmountComponentAtNode, ReactDOM  }  from 'react-dom';
import { Router ,BrowserRouter } from "react-router-dom";
import { cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import {Cryptr} from 'cryptr';
import Dashboard from '../pages/DashboardPage';




describe('Testing menu coach', () => {
    let Cryptr;
    let cryptr;
    let encrypted;

    let wrapper = null
    const spyNavigate = jest.fn()

    Cryptr=require('cryptr');
    cryptr=new Cryptr('Secret');

    encrypted=cryptr.encrypt("COACH");
    document.cookie=`role=${encrypted}`;

    it('renders without crashing', async () => {

        const root = document.createElement('div');
        document.body.appendChild(root);
        render(
            <BrowserRouter>
                <Dashboard required={true} location={{hash:"",pathname:"/dashboard",search:"",state:undefined}} match={{isExact: true, path: "/dashboard", url: "/dashboard"}}/>
            </BrowserRouter>,root
        );
        expect(document.body.textContent).toContain('B&B SportHomeScheduleContractCoach toolsAccount');
    })

})