import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithGoogle } from '../firebase';


export function LogIn() {
    return (
        <div className='Authentication'>
            <Banner />
            <AuthForm type='login'/>
            <FillSpace />
        </div>
    )
}

export function SignUp() {
    return (
        <div className='Authentication'>
            <Banner />
            <AuthForm type='signup' />
            <FillSpace />
        </div>
    )
}

function Banner() {
    return (
        <header className='Banner'>
            <h2>Menus For All</h2>
        </header>
    )
}

function AuthForm({ type }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function typeIs() {
        return type === 'login';
    }

    return (
        <section className='AuthForm'>
            <h2>{typeIs() ? 'Log In' : 'Sign Up'}</h2>

            <button 
                onClick={signInWithGoogle}
                className='AuthForm-input'
                >
                {typeIs() ? 'Log In with Google' : 'Continue with Google'}
            </button>

            <div> OR </div>

            <form>
                <input 
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Email'
                    className='AuthForm-input'
                />
                <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Password'
                    className='AuthForm-input'
                />
                <button className='AuthForm-submit'>
                    {typeIs() ? 'Log In' : 'Sign Up'}
                </button>
            </form>

            {typeIs() ? 
                <span>
                    New to Menus For All?
                    <Link to='/signup'>Sign Up</Link>
                </span> :
                <span>
                    Already have an account?
                    <Link to='login'>Log In</Link>
                </span>
            }
        </section>
    )
}

function FillSpace() {
    return (
        <section>

        </section>
    )
}