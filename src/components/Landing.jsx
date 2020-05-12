import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { LocationContext } from './Application';
import { MdSearch, MdLocationSearching, MdLocalCafe, MdLocalBar, MdLocalDining, MdLocalPizza, MdAirplanemodeActive } from 'react-icons/md';
import { FaLink, FaGithub, FaLinkedinIn, FaHamburger, FaFish, FaLeaf } from 'react-icons/fa';
import axios from 'axios';

export default function Landing() {

    return (
        <section className='Landing'>
            <NavBar />
            <Search />
            <Categories />
            <Credits />
        </section>
    )
}

function Search () {
    const [keyword, setKeyword] = useState('');
    const [city, setCity] = useState('');
    const { location, setLocation } = useContext(LocationContext);

    useEffect(() => {
        setLocation(city);
    }, [city])

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
                const response = await zomatoRequest.get(`/cities?lat=${lat}&lon=${lon}`);
                window.response = response;
                setCity(response.data.location_suggestions[0].name);
            })
        } else {
            console.log('no geolocation')
        }
    }

    return (
        <section className='Landing-Search'>
            <form>
                <input 
                    type="text"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    placeholder='Italian, Cafés, Burritos...'
                    required
                />
                <input 
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder='Seattle, WA'
                    required
                />
                <MdLocationSearching className='Landing-Search-Locate' onClick={getLocation}/>
                <button>
                    <MdSearch />
                </button>
            </form>
            <Link to='search'>Advanced Search</Link>
        </section>
    )
}

function Categories() {

    function CategoryCard({ icon, name }) {
        return (
            <Link to={{ pathname: '/search', state: { keyword: name }}} className='Landing-Categories-Card'>
                {icon}
                {name}
            </Link>
        )
    }

    return (
        <section className='Landing-Categories'>
            <h2>Search by Category</h2>
            <div>
                <CategoryCard icon={<MdLocalCafe />} name={'Cafes'}/>
                <CategoryCard icon={<FaHamburger />} name={'Burgers'}/>
                <CategoryCard icon={<MdLocalBar />} name={'Bars'} />
                <CategoryCard icon={<MdLocalDining />} name={'Restaurants'}/>
                <CategoryCard icon={<MdLocalPizza />} name={'Pizza'}/>
                <CategoryCard icon={<FaFish />} name={'Seafood'} />
                <CategoryCard icon={<MdAirplanemodeActive />} name={'International'} />
                <CategoryCard icon={<FaLeaf />} name={'Vegetarian'} />
            </div>
        </section>
    )
}

function Credits() {
    return (
        <section className="Credits">
            <p>Hi! I'm looking for a job. Check me out!</p>
            <div className="links">
                <a href="https://github.com/AlexanderDGeorge">
                    <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/alexander-george-410466151/">
                    <FaLinkedinIn />
                </a>
                <a href="https://alexgeorge.dev">
                    <FaLink />
                </a>
            </div>
        </section>
    )
}