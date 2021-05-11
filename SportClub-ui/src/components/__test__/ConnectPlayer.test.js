import React from 'react';
import { render, unmountComponentAtNode, ReactDOM } from 'react-dom';
import { Router, BrowserRouter } from "react-router-dom";
import { cleanup, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Cryptr } from 'cryptr';
import CoachPlayerPage from '../pages/CoachPlayerPage';
import AuthService from "../../services/AuthService";
import MenuAdmin from "../menu/MenuAdmin";

describe('Testing table with players', () => {

    let encrypted;

    beforeEach(() => {
        var CryptoJS = require("crypto-js");
        encrypted = CryptoJS.AES.encrypt("ADMIN", "Secret");

        document.cookie = `role=${encrypted}`;
    })

    it('renders without crashing', async () => {
        const root = document.createElement('div');
        document.body.appendChild(root);

        render(<CoachPlayerPage />, root);

        expect(screen.getByText("Connect player with coach")).toBeInTheDocument();


    }, 300000)
})