import React from 'react';
import { render, unmountComponentAtNode, ReactDOM } from 'react-dom';
import { Router, BrowserRouter } from "react-router-dom";
import { cleanup, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Cryptr } from 'cryptr';
import ChangeDetails from '../pages/ChangeDetailsPage';
import AuthService from "../../services/AuthService";
import MenuAdmin from "../menu/MenuAdmin";

describe('Testing role', () => {
    let wrapper = null
    let Cryptr;
    let cryptr;
    let encrypted;
    const spyNavigate = jest.fn()
    const params = {
        id: '1'
    }


    beforeEach(() => {
        var CryptoJS = require("crypto-js");
        encrypted = CryptoJS.AES.encrypt("ADMIN", "Secret");

        document.cookie = `role=${encrypted}`;
    })

    it('renders without crashing', async () => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        render(
            <BrowserRouter>
                <ChangeDetails err={false} required={true} location={{ hash: "", pathname: "/appUsers/1", search: "", state: undefined }} match={{ params: { id: 1 }, isExact: true, path: "/appUsers/:id", url: "/appUsers/1" }} />
            </BrowserRouter>, root
        );
        expect(document.body.textContent).toContain('Change details');


    }, 300000)
})
