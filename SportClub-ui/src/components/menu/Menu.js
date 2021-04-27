import MenuPlayer from './MenuPlayer';
import MenuAdmin from './MenuAdmin';
import MenuCoach from './MenuCoach';
import {Cookies} from 'react-cookie';


const Menu = () => {
     const cookie=new Cookies();

        var CryptoJS=require("crypto-js");

         const role=CryptoJS.AES.decrypt(cookie.get('role').toString(),"Secret").toString(CryptoJS.enc.Utf8);
        if(role==='COACH')
            return (
                <div>
                    <MenuCoach />
                </div>
            );
        else if(role==='PLAYER')
            return (
                <div>
                    <MenuPlayer />
                </div>
            );
        else if(role==='ADMIN')
        return (
            <div>
                <MenuAdmin />
            </div>
        );
};
export default Menu;