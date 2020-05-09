import React from 'react';
import { Link } from '@reach/router';

const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: 'active' } : {};
};

const isPartiallyActive = ({ isPartiallyCurrent }) => {
    return isPartiallyCurrent ? { className: 'active' } : {};
};

const PartialNavLink = props => <Link getProps={isPartiallyActive} {...props} />;
const NavLink = props => <Link getProps={isActive} {...props} />;

const Header = () => {
    return (
        <header>
            <div className="container">
                <h1>SeasonFight</h1>
                <nav className="nav-links">
                    <NavLink to="/">Home</NavLink>
                    <PartialNavLink to="game">Game</PartialNavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
