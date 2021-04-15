import React from 'react';
import axios from 'axios';



class AuthService {



    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem('jwt', username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
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