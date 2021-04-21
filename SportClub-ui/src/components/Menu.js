import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

import MenuPlayer from './MenuPlayer';
import MenuAdmin from "./MenuAdmin";
import MenuCoach from "./MenuCoach";
import {Cookies} from 'react-cookie';
import {Cryptr} from 'cryptr';

const Menu = () => {
     const cookie=new Cookies();
        const Cryptr=require('cryptr');
        const cryptr=new Cryptr('Secret');
        var role=cryptr.decrypt(cookie.get('role'));
        let n;
        if(role=='COACH')
        {
            n=<MenuCoach />;
        }else if(role=='PLAYER')
        {
         n=<MenuPlayer />;
        } else if(role=='ADMIN') n=<MenuAdmin />;
  return (
    <div>
        {n};
    </div>
  );
};
export default Menu;