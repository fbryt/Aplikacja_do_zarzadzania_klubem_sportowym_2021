import { Navbar, Nav, Form, FormControl, Button, Dropdown, DropdownButton, } from "react-bootstrap";
import { useHistory } from "react-router";
import AuthService from "../../services/AuthService";
import Container from 'react-bootstrap/Container'
const MenuAdmin = () => {

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
              <DropdownButton id="dropdown-basic-button" title="Admin tools">
                <Dropdown.Item href="/appUsers">Check all users</Dropdown.Item>
                <Dropdown.Item href="/playersWithCoach">Connect players with Coach</Dropdown.Item>
                <Dropdown.Item href="/announcement">Create announcement</Dropdown.Item>
                <Dropdown.Item href="/register">Register user</Dropdown.Item>
              </DropdownButton>
            </Nav>

            <DropdownButton id="dropdown-basic-button" drop="down" title="Account">
              <Dropdown.Item href="/settings">Info</Dropdown.Item>
              <Dropdown.Item href="/settings/password">Change password</Dropdown.Item>
              <Dropdown.Item href="#" onClick={Logout}> Logout </Dropdown.Item>
            </DropdownButton>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  );
};
export default MenuAdmin;
