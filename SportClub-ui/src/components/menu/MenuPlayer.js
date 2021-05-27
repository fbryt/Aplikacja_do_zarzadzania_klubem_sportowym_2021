import { Navbar, Nav, Dropdown, DropdownButton, } from "react-bootstrap";
import { useHistory } from "react-router";
import AuthService from "../../services/AuthService";
import Container from 'react-bootstrap/Container'
const MenuPlayer = () => {

  const history = useHistory();

  function Logout() {
    AuthService.logout();
    history.push('/');
  }

  return (
    <>
      <Navbar collapseOnSelect fixed='top' expand='sm' bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls='reponsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Navbar.Brand href="/dashboard" className="px-m-0 px-p">
              <img
                src="/B&B-Logo.png"
                width="100"
                height="45"
              />
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/dashboard">Home</Nav.Link>
              <Nav.Link href="#">Schedule</Nav.Link>
              <Nav.Link href="/mycontract">Contract</Nav.Link>
              <Nav.Link href="/declareInjury">Declare Injury</Nav.Link>
            </Nav>
            <DropdownButton id="dropdown-basic-button" drop="down" variant="secondary"title="Account">
              <Dropdown.Item href="/settings">Info</Dropdown.Item>
              <Dropdown.Item href="/settings/password">Change password</Dropdown.Item>
              <Dropdown.Item href="" onClick={Logout}> Logout </Dropdown.Item>
            </DropdownButton>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  );
};
export default MenuPlayer;
