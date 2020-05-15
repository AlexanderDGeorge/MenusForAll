import React, { createContext, useState, useEffect } from 'react';
import Landing from './Landing';
import Search from './Search/Search';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { LogIn, SignUp } from './Authentication';
import { auth } from '../firebase';

export const UserContext = createContext(null);
export const ResultsContext = createContext(null);
export const SearchParamsContext = createContext({
    lat: null,              //latitude
    setLat: () => {},
    lon: null,              //longitude
    setLon: () => {},
    city: 'Seattle, WA',    //city
    setCity: () => {},
    cityID: '279',          //entity_id; entity_type muse equal city
    setCityID: () => {},
    radius: 10000,          //distance around lat/lon in meters
    setRadius: () => {},
    cuisines: [],           //array of ids
    setCuisines: () => {},
    categories: [],         //array of ids
    setCategories: () => {},
    establishment: '',      //single id
    setEstablishment: () => {},
    query: '',              //keyword in search bar input
    setQuery: () => {},
    sort: 'rating',         //cost, rating, or real_distance
    setSort: () => {},
    order: 'desc',          //asc or desc
    setOrder: () => {}
});

export default function Application() {

    const [user, setUser] = useState(null);
    const [results, setResults] = useState(null);

    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [city, setCity] = useState('Seattle, WA');
    const [cityID, setCityID] = useState(279);
    const [radius, setRadius] = useState(null);
    const [cuisines, setCuisines] = useState(null);
    const [categories, setCategories] = useState(null);
    const [establishment, setEstablishment] = useState(null);
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('rating');
    const [order, setOrder] = useState('desc');
    const value = { 
        lat, setLat, lon, setLon, city, setCity, cityID, setCityID,
        radius, setRadius, cuisines, setCuisines, categories, setCategories, 
        establishment, setEstablishment, query, setQuery, 
        sort, setSort, order, setOrder
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => setUser(user));
    }, [])

    window.value = value;
    window.user = user;
    window.results = results;

    return (
        <main className='Application'>
            <HashRouter>
                <Switch>
                    <UserContext.Provider value={{ user, setUser }}>
                    <ResultsContext.Provider value={{ results, setResults }}>
                    <SearchParamsContext.Provider value={value}>
                        <Route path='/login' component={LogIn}/>
                        <Route path='/signup' component={SignUp}/>
                        <Route path='/search' component={Search} />
                        <Route exact path='/' component={Landing}/>
                    </SearchParamsContext.Provider>
                    </ResultsContext.Provider>
                    </UserContext.Provider>
                </Switch>
            </HashRouter>
        </main>
    )
}