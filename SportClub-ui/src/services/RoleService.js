import {Cookies} from 'react-cookie';
import React from "react";

class RoleService{

    getRole()
    {
        const cookie=new Cookies();
        let CryptoJS=require("crypto-js");
        let role = "ANON";
        if (cookie.get('role')) {
            const cookieEncrypted = cookie.get('role').toString();
            role = CryptoJS.AES.decrypt(cookieEncrypted, "Secret").toString(CryptoJS.enc.Utf8);
        }
        return role;
    }

}export default new RoleService()