import React, { useEffect } from 'React';
import { Link } from 'react-router-dom';

const Navbar = props => {

    /*const authLinks = (
        <>
            <a className="navbarButtonThree" href="" onClick={onLogoutClick.bind(this)}>Logout</a>
        </>
    );

    const guestLinks = (
        <>
            <Link to='/register' className="navbarButtonTwo">Sign Up</Link>
            <Link to='/login' className="navbarButtonOne">Login</Link>
        </>
    );

    let navbar =
        <div className="navbar">
            <div className="navbarLeft">
                <Link to='/' className="navbarLogo">BudJet</Link>
            </div>
            <div className="navbarRight">
                {isAuthenticated ? authLinks : guestLinks}
            </div>
        </div>;*/

    let navbar =
        <>
            <Link to='/register' className="navbarButtonTwo">Sign Up</Link>
            <Link to='/login' className="navbarButtonOne">Login</Link>
        </>

    return navbar
}

export default Navbar
