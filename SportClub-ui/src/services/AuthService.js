import React from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { Cookies } from 'react-cookie';


class AuthService {


    registerSuccessfulLoginForJwt(username, token, id) {
        const cookie = new Cookies();
        var CryptoJS = require("crypto-js");

        const encrypted = CryptoJS.AES.encrypt(jwt_decode(token).UserRole, "Secret");
        sessionStorage.setItem('jwt', token);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('id', id);
        cookie.set("role", encrypted.toString(), { path: '/', httpOnly: false , secure:true });   //TODO: required to test on firefox, look into this more
        //this.setupAxiosInterceptors(this.createJWTToken(token));
    }

    refreshAxiosInterceptors() {
        const token = sessionStorage.getItem('jwt');
        if (token != null)
            this.setupAxiosInterceptors(this.createJWTToken(token));
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }


    logout() {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('id');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('username');
        return user !== null;

    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('username');
        if (user === null) return ''
        return user
    }

    getLoggedInId() {
        let user = sessionStorage.getItem('id');
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        console.log("INTERCEPTING!");
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token;
                    config.headers.crossdomain = true;
                    config.headers.withCredentials = true;
                }
                return config
            }
        )
    }
}

export default new AuthService()