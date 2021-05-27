import MenuPlayer from './MenuPlayer';
import MenuAdmin from './MenuAdmin';
import MenuCoach from './MenuCoach';
import RoleService from "../../services/RoleService";

const Menu = () => {

    const role=RoleService.getRole();
    if (role === 'COACH')
        return (
            <div>
                <MenuCoach />
            </div>
        );
    else if (role === 'PLAYER')
        return (
            <div>
                <MenuPlayer />
            </div>
        );
    else if (role === 'ADMIN')
        return (
            <div>
                <MenuAdmin />
            </div>
        );
};
export default Menu;