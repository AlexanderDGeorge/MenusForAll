import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext, SearchParamsContext } from '../Application';
import { MdSearch, MdLocationSearching } from 'react-icons/md';
import axios from 'axios';
import User from '../User';
import SearchFilter from './SearchFilter';
import SearchResults from './SearchResults';

export default function Search() {

    return (
        <section className='Search'>
            <SearchHeader />
            <SearchFilter />
            <SearchResults />
        </section>
    )
}

function SearchHeader() {

    const { user } = useContext(UserContext);

    return (
        <section className='Search-Header'>
            <Link to='/'>Home</Link>
            <SearchBar />
            {user ? 
                <User /> :
                <div className='SH-Auth'>
                    <Link to='/login'>Log In</Link>
                    <Link to='/signup'>Sign Up</Link>
                </div>
            }
        </section>
    )
}

export function SearchBar() {
    
    const [city, setCity] = useState('');
    const { query, setQuery, setLat, setLon } = useContext(SearchParamsContext);

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
                setLat(lat);
                setLon(lon);
                console.log(lat, lon);
                const response = await zomatoRequest.get(`/cities?lat=${lat}&lon=${lon}`);
                window.response = response;
                setCity(response.data.location_suggestions[0].name);
            })
        } else {
            console.log('no geolocation')
        }
    }

    function handleClick() {

    }

    return (
        <section className='Search-Bar'>
            <form>
                <input 
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder='Italian, Cafés, Burritos...'
                />
                <div></div>
                <input 
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder='Seattle, WA'
                />
                <MdLocationSearching className='Search-Bar-Locate' onClick={getLocation}/>
                <button onClick={handleClick}>
                    <MdSearch />
                </button>
            </form>
        </section>
    )
}