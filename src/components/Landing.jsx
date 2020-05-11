import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { MdSearch } from 'react-icons/md';

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
    const [keyword, setKeyword] = useState('');
    const [city, setCity] = useState('');

    return (
        <section className='Landing-Search'>
            <form>
                <input 
                    type="text"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    placeholder='Italian, Cafes, Fast Food...'
                />
                <input 
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder='Seattle'
                />
                <button>
                    <MdSearch />
                </button>
            </form>
            <Link>Advanced Search</Link>
        </section>
    )
}

function NearYou() {


    return (
        <section className='Landing-Near'>
            <h2>Near You</h2>
        </section>
    )
}