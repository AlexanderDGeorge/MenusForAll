import React, { useEffect, useState } from 'react';
import Landing from './Landing';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { LogIn, SignUp } from './Authentication';
import { firestore, auth } from '../firebase';

export default function Application() {

    // let unsubscribeFromFirestore = null;
    const [unsubscribeFromAuth, setUnsubscribeFromAuth] = useState(null);

    useEffect(() => {
        unsubscribeFromAuth = auth.onAuthStateChanged(user => {

        })
    }, []);

    return (
        <main className='Application'>
            <HashRouter>
                <Switch>
                    <Route path='/login' component={LogIn}/>
                    <Route path='/signup' component={SignUp}/>
                    <Route path='/' component={Landing}/>
                </Switch>
            </HashRouter>
        </main>
    )
}