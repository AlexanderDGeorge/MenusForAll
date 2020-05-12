import React, { createContext, useState, useEffect } from 'react';
import Landing from './Landing';
import Search from './Search';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { LogIn, SignUp } from './Authentication';
import { auth } from '../firebase';

export const UserContext = createContext(null);
export const LocationContext = createContext(null);
export const SearchParamsContext = createContext(null);

export default function Application() {

    const [user, setUser] = useState(null);
    const [location, setLocation] = useState(null);
    const [searchParams, setSearchParams] = useState({
        lat: null,
        lon: null,
        
    });

    useEffect(() => {
        auth.onAuthStateChanged(user => setUser(user));
    }, [])

    window.user = user;

    return (
        <main className='Application'>
            <HashRouter>
                <Switch>
                    <UserContext.Provider value={{ user, setUser }}>
                    <LocationContext.Provider value={{ location, setLocation }}>
                    <SearchParamsContext.Provider value={{ searchParams, setSearchParams }}>
                        <Route path='/login' component={LogIn}/>
                        <Route path='/signup' component={SignUp}/>
                        <Route path='/search' component={Search} />
                        <Route exact path='/' component={Landing}/>
                    </SearchParamsContext.Provider>
                    </LocationContext.Provider>
                    </UserContext.Provider>
                </Switch>
            </HashRouter>
        </main>
    )
}