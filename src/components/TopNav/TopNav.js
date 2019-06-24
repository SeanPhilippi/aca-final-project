import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavLink from 'react-router-dom/NavLink';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { logoutUser } from '../../redux/actions';
import './TopNav.css';

class TopNav extends React.PureComponent {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  // showStatus() {
  //   return
  // }

  render() {
    const { isAuthenticated, showNavItems } = this.props;

    const authLinks = (
      <Nav className="p-0">
        <Nav.Link onClick={this.onLogoutClick}>
          <NavLink to="/">Logout</NavLink>
        </Nav.Link>
      </Nav>
    )

    const guestLinks = (
      <Nav>
        <Nav.Link>
          <NavLink to="/login">Login</NavLink>
        </Nav.Link>
        <Nav.Link>
          <NavLink to="/register">Register</NavLink>
        </Nav.Link>
      </Nav>

    )

    return (
      <Navbar className="navbar mt-4">
        {this.props.update && this.showStatus()}
        <Navbar.Brand className="brand">
          <NavLink style={{ textDecoration: 'none'}} to={isAuthenticated ? '/' : '/login'}>
            <span className="site-title m-0 ml-4">YMDb</span>
            <span className="subtitle ml-4">Your Movie Database</span>
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          { showNavItems &&
            <Nav className="ml-auto">

              <Nav.Link>
                <NavLink to="/top-movies">Top Movie List</NavLink>
              </Nav.Link>

              <Nav.Link>
                <NavLink to="/profile">Your Top List</NavLink>
              </Nav.Link>

              { isAuthenticated ? authLinks : guestLinks }
            </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

TopNav.propTypes = {
  username: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  username: state.username,
  logoutUser: state.logoutUser,
  showNavItems: state.showNavItems
});

export default connect(mapStateToProps, { logoutUser })(TopNav)
