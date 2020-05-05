import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {

    return (
        <header className='NavBar'>
            <Link to='/'>Menus For All</Link>
            <ul>
                <NavItem name={'home'}/>
                <NavItem name={'menus'}/>
            </ul>
        </header>
    )
}

function NavItem(props) {

    const { icon, name } = props;

    return (
        <li className='NavItem'>
            {icon ? icon : null}
            {name}
        </li>
    )
}