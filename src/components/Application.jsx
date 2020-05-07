import React from 'react';
import Landing from './Landing';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { LogIn, SignUp } from './Authentication';

export default function Application() {

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