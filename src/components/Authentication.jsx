import React from 'react';
import { signInWithGoogle } from '../firebase';

export default function Authentication() {
    return (
        <div>
            <SignIn />
        </div>
    )
}

function SignIn() {
    return (
        <div>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    )
}