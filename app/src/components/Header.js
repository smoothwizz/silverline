import React from 'react';
import { Link } from '@reach/router';

const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: 'active' } : {};
};

const NavLink = props => <Link getProps={isActive} {...props} />;

const Header = () => {
    return (
        <header>
            <h1>Silverlight</h1>
            <nav className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="game">Game</NavLink>
            </nav>
        </header>
    );
};

export default Header;
