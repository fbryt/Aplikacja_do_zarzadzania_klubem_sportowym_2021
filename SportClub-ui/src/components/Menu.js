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
        let n = 0;
        if(role==='COACH')
            n=<MenuCoach />;
        else if(role==='PLAYER')
         n=<MenuPlayer />;
        else if(role==='ADMIN') n=<MenuAdmin />;
          return (
            <div>
                {n}
            </div>
  );
};
export default Menu;