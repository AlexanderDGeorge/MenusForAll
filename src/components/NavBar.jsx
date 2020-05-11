import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './Application';
import User from './User';

export default function NavBar() {

    const { user } = useContext(UserContext);
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    });

    function handleScroll(e) {
        console.log(e);
        if (window.scrollY > 100) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    }

    return (
        <header className='NavBar' style={scroll ? { backgroundColor: 'rgba(0, 0, 0, 0.7)' } : { backgroundColor: 'transparent' }}>
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
