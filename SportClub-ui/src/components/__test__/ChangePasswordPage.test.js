import React from 'react';
import { render} from 'react-dom';
import {screen } from "@testing-library/react";

import ChangePassword from "../pages/ChangePasswordPage";

describe('Testing change password page', () => {

    let encrypted;

    beforeEach(() => {
        var CryptoJS = require("crypto-js");
        encrypted = CryptoJS.AES.encrypt("ADMIN", "Secret");

        document.cookie = `role=${encrypted}`;
    })

    it('renders without crashing', async () => {
        const root = document.createElement('div');
        document.body.appendChild(root);

        render(<ChangePassword/>, root);

        expect(screen.getByText("Current Password")).toBeInTheDocument();

    }, 300000)
})