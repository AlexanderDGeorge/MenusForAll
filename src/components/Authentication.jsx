import React, { useState } from 'react';
import { signInWithGoogle } from '../firebase';


export function LogIn() {
    return (
        <div className='Authentication'>
            <Banner />
            <AuthForm type='login'/>
        </div>
    )
}

export function SignUp() {
    return (
        <div className='Authentication'>
            <Banner />
            <AuthForm type='signup' />
        </div>
    )
}

function Banner() {
    return (
        <header className='Banner'>
            <h1>Menus For All</h1>
        </header>
    )
}

function AuthForm({ type }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <section>
            <form>
                <input type="text"/>

            </form>
            <div></div>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </section>
    )
}