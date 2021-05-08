import React from 'react';
import { render, unmountComponentAtNode, ReactDOM } from 'react-dom';
import { Router, BrowserRouter } from "react-router-dom";
import { cleanup, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Cryptr } from 'cryptr';
import AppUsersPage from '../pages/AppUsersPage';
import AuthService from "../../services/AuthService";
import MenuAdmin from "../menu/MenuAdmin";

describe('Testing role', () => {

    let encrypted;

    beforeEach(() => {
        var CryptoJS = require("crypto-js");
        encrypted = CryptoJS.AES.encrypt("ADMIN", "Secret");

        document.cookie = `role=${encrypted}`;
    })

    it('renders without crashing', async () => {
        const root = document.createElement('div');
        document.body.appendChild(root);

        render(<AppUsersPage />, root);

        expect(screen.getByText("Change details")).toBeInTheDocument();

    }, 300000)
})
