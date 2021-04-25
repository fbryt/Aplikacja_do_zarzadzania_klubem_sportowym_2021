import MenuPlayer from './MenuPlayer';
import MenuAdmin from './MenuAdmin';
import MenuCoach from './MenuCoach';
import {Cookies} from 'react-cookie';
import {Cryptr} from 'cryptr';

const Menu = () => {
     const cookie=new Cookies();
        const Cryptr=require('cryptr');
        const cryptr=new Cryptr('Secret');
        const role=cryptr.decrypt(cookie.get('role'));
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