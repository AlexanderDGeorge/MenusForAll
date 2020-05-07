import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {

    return (
        <header className='NavBar'>
            <ul>
                <NavItem name={'Home'} path={'/home'}/>
                <NavItem name={'Menus'} path={'/menus'}/>
            </ul>

            <ul>
                <NavItem name={'Log In'} path={'/login'}/>
                <NavItem name={'Sign Up'} path={'/signup'}/>
            </ul>
        </header>
    )
}

function NavItem(props) {

    const { icon, name, path } = props;

    return (
        <Link className='NavItem' to={path}>{icon} {name}</Link>
    )
}