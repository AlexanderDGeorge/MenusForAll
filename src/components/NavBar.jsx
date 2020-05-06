import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {

    return (
        <header className='NavBar'>
            <Link to='/'>Menus For All</Link>
            <ul>
                <NavItem name={'home'} path={'/home'}/>
                <NavItem name={'menus'} path={'/menus'}/>
            </ul>
        </header>
    )
}

function NavItem(props) {

    const { icon, name, path } = props;

    return (
        <li className='NavItem'>
            {icon ? icon : null}
            <Link to={path}>{name}</Link>
        </li>
    )
}