import React, { createContext, useState, useEffect } from 'react';
import Landing from './Landing';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { LogIn, SignUp } from './Authentication';
import { auth } from '../firebase';

export const UserContext = createContext(null);

export default function Application() {

    const [user, setUser] = useState(null);


    useEffect(() => {
        auth.onAuthStateChanged(user => setUser(user));
    }, [])

    // console.log(user);
    window.user = user;

    return (
        <main className='Application'>
            <HashRouter>
                <Switch>
                    <UserContext.Provider value={{ user, setUser }}>
                        <Route path='/login' component={LogIn}/>
                        <Route path='/signup' component={SignUp}/>
                        <Route path='/' component={Landing}/>
                    </UserContext.Provider>
                </Switch>
            </HashRouter>
        </main>
    )
}