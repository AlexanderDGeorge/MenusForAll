import React, { createContext, useState, useEffect } from 'react';
import Landing from './Landing';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { LogIn, SignUp } from './Authentication';
import { firestore, auth } from '../firebase';

export const UserContext = createContext(null);

export default function Application() {

    const [user, setUser] = useState(null);


    useEffect(() => {
        auth.onAuthStateChanged(user => setUser(user));
    }, [])

    console.log(user);

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

// unsubscribeFromFirestore = null;
// unsubscribeFromAuth = null;

// componentDidMount = async () => {
//   this.unsubscribeFromFirestore = firestore
//     .collection('posts')
//     .onSnapshot(snapshot => {
//       const posts = snapshot.docs.map(collectIdsAndData);
//       this.setState({ posts });
//     });

//   this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
//     this.setState({ user });
//   });
// };

// componentWillUnmount = () => {
//   this.unsubscribeFromFirestore();
//   this.unsubscribeFromAuth();
// };