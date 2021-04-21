import React from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {Cookies} from 'react-cookie';
import {Cryptr} from 'cryptr';

class AuthService {


    registerSuccessfulLoginForJwt(username, token) {
        const cookie=new Cookies();
        const Cryptr=require('cryptr');
        const cryptr=new Cryptr('Secret');
        const encrypted=cryptr.encrypt(jwt_decode(token).UserRole);

        sessionStorage.setItem('jwt', username);
        cookie.set("role",encrypted,{path:'/',secure: true});
        this.setupAxiosInterceptors(this.createJWTToken(token));
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }


    logout() {
        sessionStorage.removeItem('jwt');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('jwt');
        return user !== null;

    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('jwt');
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthService()