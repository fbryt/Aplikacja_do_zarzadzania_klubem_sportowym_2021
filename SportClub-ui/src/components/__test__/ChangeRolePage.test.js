import React from 'react';
import { render, unmountComponentAtNode, ReactDOM  }  from 'react-dom';
import { Router ,BrowserRouter } from "react-router-dom";
import { cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import {Cryptr} from 'cryptr';
import ChangeRole from '../pages/ChangeRolePage';

describe('Testing role', () => {
    let wrapper = null
    let Cryptr;
    let cryptr;
    let encrypted;
    const spyNavigate = jest.fn()
    const params = {
        id: '1'
    }
    Cryptr=require('cryptr');
    cryptr=new Cryptr('Secret');

    encrypted=cryptr.encrypt("ADMIN");
    document.cookie=`role=${encrypted}`;

    it('renders without crashing', async () => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        render(
            <BrowserRouter>
                <ChangeRole required={true} location={{hash:"",pathname:"/appUsers/1",search:"",state:undefined}} match={{params: {id: 1}, isExact: true, path: "/appUsers/:id", url: "/appUsers/1"}}/>
            </BrowserRouter>,root
        );
        expect(document.body.textContent).toContain('Change role');
    },30000)
})
