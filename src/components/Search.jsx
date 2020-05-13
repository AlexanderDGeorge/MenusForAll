import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext, SearchParamsContext } from './Application';
import { MdSearch, MdLocationSearching } from 'react-icons/md';
import axios from 'axios';
import User from './User';

export default function Search(props) {

    const { searchParams, setSearchParams } = useContext(SearchParamsContext);
    console.log(searchParams);


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
                console.log(lat, lon);
                const response = await zomatoRequest.get(`/cities?lat=${lat}&lon=${lon}`);
                window.response = response;
                setCity(response.data.location_suggestions[0].name);
            })
        } else {
            console.log('no geolocation')
        }
    }

    return (
        <section className='Search-Bar'>
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
                <MdLocationSearching className='Search-Bar-Locate' onClick={getLocation}/>
                <button>
                    <MdSearch />
                </button>
            </form>
            {/* <Link to='search'>Advanced Search</Link> */}
        </section>
    )
}

function SearchResults() {


    return (
        <section className='Search-Results'>

        </section>
    )
}

function SearchFilter() {

    const [showAdvanced, setShowAdvanced] = useState(false);
    const [radius, setRadius] = useState(10);


    return (
        <section className='Search-Filter'>
            <section>
                <h3>Filters</h3>
                <div className='Toggle'>
                    <div className='Toggle-button' onClick={() => setShowAdvanced(!showAdvanced)}>
                    </div>
                </div>
            </section>
            <SearchFilterSection 
                title={'Location'} children={
                    <form>

                    </form>
                }
            />
            <SearchFilterSection 
                title={'Distance'} children={
                    <form>
                        
                        <input type="range" min='1' max='50'
                            onChange={e => setRadius(e.target.value)}
                            value={radius}
                            style={{ width: 150 }}
                        />
                        {radius}
                    </form>
                }
            />
            <SearchFilterSection 
                title={'Category'} optionsArray={['Delivery', 'Dine-out', 
                'Nightlife', 'Cafes', 'Breakfast', 'Lunch', 'Dinner', 'Bars', 
                'Clubs']} type={'checkbox'}
            />
            {showAdvanced ? <section style={{ width: '100%' }}>
                <SearchFilterSection
                    title={'Cuisine'} optionsArray={['American', 'Asian', 'BBQ', 'Bakery',
                    'Bar Food', 'Beverages', 'Breakfast', 'Burgers', 'Cafe', 'Cajun', 'Chinese',
                    'Coffee', 'Crepes', 'Deli', 'Desserts', 'Diner', 'Donuts', 'Fast Food',
                    'Filipino', 'French', 'German', 'Greek', 'Healthy', 'Ice Cream', 'Indian',
                    'International', 'Italian', 'Japanese', 'Juices', 'Korean', 'Latin', 'Mediterranean',
                    'Mexican', 'Middle Eastern', 'Mongolian', 'New American', 'Pizza', 'Russian', 
                    'Salad', 'Sandwich', 'Seafood', 'Southern', 'Steak', 'Sushi', 'Taco', 'Tapas',
                    'Tea', 'Teriyaki', 'Tex-Mex', 'Thai', 'Vegetarian', 'Vietnamese']} type={'checkbox'}
                />
                <SearchFilterSection 
                    title={'Establishment'} optionsArray={['Quick Bites', 'Sandwich Shop', 'Cafe',
                    'Fast Food', 'Bar', 'Casual Dining', 'Deli', 'Bakery', 'Fine Dining', 'Pizzeria',
                    'Diner', 'Lounge', 'Wine Bar', 'Pub', 'Coffee Shop', 'Dessert Parlour', 'Club', 
                    'Bistro', 'Fast Casual', 'Brewery', 'Juice Bar', 'Food Court', 'Taqueria', 'Noddle Shop',
                    'Beer Garden', 'Steakhouse', 'Cocktail Bar', 'Beverage Shop', 'Sweet Shop', 'Food Truck',
                    'Izakaya', 'Microbrewery', 'Vineyard', 'Shack']} type={'radio'}
                />
            </section> : null }
            <button className='SF-submit'>Apply Filters</button>
        </section>
    )
}

function SearchFilterSection({ title, optionsArray, children, type }) {

    return (
        <section className='Search-Filter-Section'>
            <h4>{title}</h4>
            {optionsArray ? optionsArray.map((option, i) => 
                <div key={i}>
                    <input type={type}/>
                    {option}
                </div>
            ) : children}
        </section>
    )
}
