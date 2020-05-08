import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './Application';
import User from './User';

export default function NavBar() {

    const { user } = useContext(UserContext);

    return (
        <header className='NavBar'>
            <ul>
                <NavItem name={'Home'} path={'/'}/>
                <NavItem name={'Menus'} path={'/menus'}/>
            </ul>

            {user ? 
                <User /> :
                <ul>
                    <NavItem name={'Log In'} path={'/login'}/>
                    <NavItem name={'Sign Up'} path={'/signup'}/>
                </ul>
            }
        </header>
    )
}

function NavItem(props) {

    const { icon, name, path } = props;

    return (
        <Link className='NavItem' to={path}>{icon} {name}</Link>
    )
}
