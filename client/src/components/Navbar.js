import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

const UserAvatar = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const UserProfileDiv = styled.div`
  display: flex;
  align-items: center;
`;

function AppNavbar() {
  const { user, isAuthenticated, logout } = useAuth0();

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      className="bg-body-dark"
      data-bs-theme="dark"
      fixed="top"
      style={{ padding: '15px'}}
    >
      <Container style={{marginBlockStart:0}}>
        <Navbar.Brand as={NavLink} to="/dashboard" className="ms-0">
          <img
            alt=""
            src="/event.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          &nbsp; EventStash.io
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/dashboard/aboutus">
              About us
            </Nav.Link>
            {/* <Nav.Link as={NavLink} to="/dashboard/contactus">
              Contact us
            </Nav.Link> */}
            <NavDropdown title="Events" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/dashboard/myevnts">
                My Events
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/dashboard/createvnt">
                Create Event
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/dashboard/managevnt">Manage Events</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/dashboard/manageusers">Manage Users</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <UserProfileDiv className="user-profile">
                <div className="d-none d-lg-block">
                  <UserAvatar
                    src={user.picture}
                    alt={user.nickname}
                  />
                </div>
                <NavDropdown title={user.nickname} id="collapsible-nav-dropdown">
                  {/* ... dropdown items for authenticated user */}
                  <NavDropdown.Item as={NavLink} to="/dashboard/profile">User Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</NavDropdown.Item>
                </NavDropdown>
              </UserProfileDiv>
            ) : (
              <NavDropdown.Item>Login</NavDropdown.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
