import React from 'react';
import NavBar from './NavBar';
import { HashRouter } from 'react-router-dom';

export default function Application() {

    return (
        <main className='Application'>
            <HashRouter>
                <NavBar />
            </HashRouter>
        </main>
    )
}