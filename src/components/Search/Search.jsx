import React, { useState, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext, SearchParamsContext, ResultsContext } from '../Application';
import { MdSearch, MdLocationSearching } from 'react-icons/md';
import { zomatoRequest } from '../../utilities';
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
    
    const [newCity, setNewCity] = useState('');
    const location = useLocation();
    const history = useHistory();

    const { setResults } = useContext(ResultsContext);
    const { lat, setLat, lon, setLon, city, setCity, cityID, setCityID,
            radius, cuisines, categories, establishment, query, setQuery,
            sort, order
    } = useContext(SearchParamsContext);

    
    async function getLocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async function handle(position){
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                setLat(lat);
                setLon(lon);
                const response = await zomatoRequest.get(`/cities?lat=${lat}&lon=${lon}`);
                setCity(response.data.location_suggestions[0].name);
                setNewCity(response.data.location_suggestions[0].name);
            })
        } else {
            console.log('no geolocation')
        }
    }

    async function handleClick() {
        if (city !== newCity) {
            setCity(newCity);
            const response = await zomatoRequest.get(`/cities?q=${city}&count=1`);
            setCityID(response.data.location_suggestions[0].id);
        }

        if (location.pathname !== '/search') {
            history.push('/search');
        }
        
        handleSearch();
    }

    async function handleSearch() {
    
        let searchString = `/search?
            ${lat ? `lat=${lat}` : `entity_id=${cityID}&entity_type=city`}&
            ${lon ? `lon=${lon}&` : ''}
            ${radius ? `radius=${radius}&` : ''}
            ${cuisines ? `cuisines=${cuisines.forEach((num, i) => {
                if (i === cuisines.length) return num
                else return `${num},`
            })}&` : ''}
            ${categories ? `category=${categories.forEach((num, i) => {
                if (i === categories.length) return num
                else return `${num},`
            })}&` : ''}
            ${establishment ? `establishment_type=${establishment}&` : ''}
            ${query ? `q=${query}&` : ''}
            sort=${sort}&
            order=${order}
        `;
        
        // delete whitespace from string
        searchString = searchString.replace(/\s/g, '');

        const response = await zomatoRequest.get(searchString);
        setResults(response);
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
                    value={newCity}
                    onChange={e => setNewCity(e.target.value)}
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