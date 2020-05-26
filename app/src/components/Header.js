import React from 'react';
import { Link } from '@reach/router';

const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: 'active' } : {};
};
const NavLink = props => <Link getProps={isActive} {...props} />;

const Header = () => {
    return (
        <header>
            <h1>SeasonFight</h1>
            <nav className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="cards">Cards</NavLink>
                <NavLink to="sim">Sim</NavLink>
                <NavLink to="game">Play</NavLink>
            </nav>
        </header>
    );
};

export default Header;
