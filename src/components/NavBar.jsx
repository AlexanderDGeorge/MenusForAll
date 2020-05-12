import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './Application';
import User from './User';

export default function NavBar() {

    const { user } = useContext(UserContext);
    const [scroll, setScroll] = useState('transparent');

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return function cleanup() {
            window.removeEventListener('scroll', handleScroll);
        }
    });

    function handleScroll() {
        let val = window.scrollY / 400;
        setScroll(`rgba(50, 50, 50, ${val})`);
    }

    return (
        <header className='NavBar' style={{ backgroundColor: scroll }}>
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
