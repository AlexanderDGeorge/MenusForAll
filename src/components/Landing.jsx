import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { MdSearch, MdLocationSearching } from 'react-icons/md';
import axios from 'axios';

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

    const zomatoRequest = axios.create({
        baseURL: 'https://developers.zomato.com/api/v2.1',
        headers: {
            'user-key': process.env.REACT_APP_ZOMATO_KEY
        }
    })

    async function getLocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async function handle(position){
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                console.log(lat);
                console.log(lon);
                const response = await zomatoRequest.get(`/cities?lat=${lat}$lon=${lon}&count=1`);
                console.log(response)
            })
        }
    }

    return (
        <section className='Landing-Search'>
            <form>
                <input 
                    type="text"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    placeholder='Italian, Cafes, Burritos...'
                    required
                />
                <input 
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder='Seattle, WA'
                    required
                />
                <MdLocationSearching className='Landing-Location' onClick={getLocation}/>
                <button>
                    <MdSearch />
                </button>
            </form>
            <Link to='search'>Advanced Search</Link>
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