import React, { Fragment } from 'react'
import { Link } from "react-router-dom";
import '../../App.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux__appli/action/auth';

const Navbar = ({ isauth: { isAuthenticated, load }, logout }) => {
// 9604554515
    const authlink = (
        <ul>
            <li>
                <Link to="/profiles"><i class="fa-brands fa-connectdevelop"></i>{' '}Developers
                </Link>
            </li>

            <li>
                <Link to="/posts"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="currentColor" class="bi bi-mailbox2" viewBox="0 0 18 21">
  <path d="M9 8.5h2.793l.853.854A.5.5 0 0 0 13 9.5h1a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5H9v1z"/>
  <path d="M12 3H4a4 4 0 0 0-4 4v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7a4 4 0 0 0-4-4zM8 7a3.99 3.99 0 0 0-1.354-3H12a3 3 0 0 1 3 3v6H8V7zm-3.415.157C4.42 7.087 4.218 7 4 7c-.218 0-.42.086-.585.157C3.164 7.264 3 7.334 3 7a1 1 0 0 1 2 0c0 .334-.164.264-.415.157z"/>
</svg>{' '}Posts
                </Link>
            </li>

            <li>
                <Link to="/dashb">
                    <i className="fas fa-user" />{' '}
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href='#!'>
                    <i className='fas fa-sign-out-alt' />{' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </ul>
    );

    const glink = (
        <ul>
            <li>
                <Link to='/profiles'>Developers</Link>
            </li>
            <li>
                <Link to='/reg'>Register</Link>
            </li>
            <li>
                <Link to='/log'>Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to='/'><i className="fas fa-code" /> DevConnector</Link>
            </h1>
            <Fragment>{isAuthenticated ? authlink : glink}</Fragment>
        </nav>
    )
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    isauth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    isauth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);