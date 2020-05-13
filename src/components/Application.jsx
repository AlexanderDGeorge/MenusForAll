import React, { createContext, useState, useEffect } from 'react';
import Landing from './Landing';
import Search from './Search';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { LogIn, SignUp } from './Authentication';
import { auth } from '../firebase';

export const UserContext = createContext(null);
export const SearchParamsContext = createContext({
    lat: null,          //latitude
    lon: null,          //longitude
    radius: 10000,      //distance around lat/lon in meters
    cuisines: [],       //array of ids
    categories: [],     //array of ids
    establishment: '',  //single id
    q: '',              //keyword in search bar input
    sort: 'cost',       //cost, rating, or real_distance
    order: 'asc'        //asc or desc
});

export default function Application() {

    const [user, setUser] = useState(null);
    const [searchParams, setSearchParams] = useState({
        lat: null,          //latitude
        lon: null,          //longitude
        radius: 10000,      //distance around lat/lon in meters
        cuisines: [],       //array of ids
        categories: [],     //array of ids
        establishment: '',  //single id
        q: '',              //keyword in search bar input
        sort: 'cost',       //cost, rating, or real_distance
        order: 'asc'        //asc or desc
    });

    useEffect(() => {
        auth.onAuthStateChanged(user => setUser(user));
    }, [])

    window.user = user;
    window.searchParams = searchParams;

    return (
        <main className='Application'>
            <HashRouter>
                <Switch>
                    <UserContext.Provider value={{ user, setUser }}>
                    <SearchParamsContext.Provider value={{ searchParams, setSearchParams }}>
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