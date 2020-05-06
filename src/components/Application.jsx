import React from 'react';
import Landing from './Landing';
import { HashRouter } from 'react-router-dom';

export default function Application() {

    return (
        <main className='Application'>
            <HashRouter>
                <Landing />
            </HashRouter>
        </main>
    )
}