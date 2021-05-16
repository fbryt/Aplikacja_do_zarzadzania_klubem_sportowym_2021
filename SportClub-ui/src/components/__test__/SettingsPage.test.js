import React from 'react';
import { render} from 'react-dom';
import {act, screen} from "@testing-library/react";
import SettingsPage from "../pages/SettingsPage";
describe("Testing Settings Page", () => {

    let encrypted;

    beforeEach(() => {
        var CryptoJS = require("crypto-js");
        encrypted = CryptoJS.AES.encrypt("ADMIN", "Secret");

        document.cookie = `role=${encrypted}`;
    })


    it('renders without crashing', async () => {
        const root = document.createElement('div');
        document.body.appendChild(root);

        render(<SettingsPage/>, root);

        expect(screen.getByText("User Info")).toBeInTheDocument();

    }, 300000)
})