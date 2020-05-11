import React from 'react';
import NavBar from './NavBar';

export default function Landing() {

    return (
        <header className='Landing'>
            <NavBar />
            <Search />
            <NearYou />
        </header>
    )
}

function Search () {
    const []

    return (
        <section className='Landing-Search'>
            <input 
                type="text"
            />

        </section>
    )
}

function NearYou() {

    // let mymap = L.map('mapid').setView([51.505, -0.09], 13);

    return (
        <section className='Landing-Near'>
            <h2>Near You</h2>
            {/* <div id='mapid'>

            </div> */}
        </section>
    )
}