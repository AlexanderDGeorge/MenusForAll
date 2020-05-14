import React, { createContext, useState, useEffect } from 'react';
import Landing from './Landing';
import Search from './Search/Search';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { LogIn, SignUp } from './Authentication';
import { auth } from '../firebase';

export const UserContext = createContext(null);
export const SearchParamsContext = createContext({
    lat: 47.6062,       //latitude
    setLat: () => {},
    lon: -122.3321,     //longitude
    setLon: () => {},
    radius: 10000,      //distance around lat/lon in meters
    setRadius: () => {},
    cuisines: [],       //array of ids
    setCuisines: () => {},
    categories: [],     //array of ids
    setCategories: () => {},
    establishment: '',  //single id
    setEstablisment: () => {},
    query: '',          //keyword in search bar input
    setQuery: () => {},
    sort: 'rating',     //cost, rating, or real_distance
    setSort: () => {},
    order: 'asc',       //asc or desc
    setOrder: () => {}
});

export default function Application() {

    const [user, setUser] = useState(null);

    const [lat, setLat] = useState(47.6062);
    const [lon, setLon] = useState(-122.3321);
    const [radius, setRadius] = useState(10000);
    const [cuisines, setCuisines] = useState(null);
    const [categories, setCategories] = useState(null);
    const [establishment, setEstablisment] = useState(null);
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('rating');
    const [order, setOrder] = useState('asc');
    const value = { 
        lat, setLat, lon, setLon, radius, setRadius, 
        cuisines, setCuisines, categories, setCategories, 
        establishment, setEstablisment, query, setQuery, 
        sort, setSort, order, setOrder
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => setUser(user));
    }, [])

    window.user = user;

    return (
        <main className='Application'>
            <HashRouter>
                <Switch>
                    <UserContext.Provider value={{ user, setUser }}>
                    <SearchParamsContext.Provider value={value}>
                        <Route path='/login' component={LogIn}/>
                        <Route path='/signup' component={SignUp}/>
                        <Route path='/search' component={Search} />
                        <Route exact path='/' component={Landing}/>
                    </SearchParamsContext.Provider>
                    </UserContext.Provider>
                </Switch>
            </HashRouter>
        </main>
    )
}