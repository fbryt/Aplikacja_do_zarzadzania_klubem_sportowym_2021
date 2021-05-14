import {Cookies} from 'react-cookie';
import React from "react";

class RoleService{

    getRole()
    {
        const cookie=new Cookies();
        let CryptoJS=require("crypto-js");
        const cookieEncrypted=cookie.get('role').toString();
        const role=CryptoJS.AES.decrypt(cookieEncrypted,"Secret").toString(CryptoJS.enc.Utf8);
        return role;
    }


}export default new RoleService()