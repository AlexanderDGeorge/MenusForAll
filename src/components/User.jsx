import React, { useContext, useState } from 'react';
import { UserContext } from './Application';
import { signOut } from '../firebase';
import { MdKeyboardArrowDown } from 'react-icons/md';

export default function User() {
    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(false);

    return (
        <div className='User' onClick={() => setOpen(!open)}>
            <img src={user['photoURL']} alt=""/>
            <MdKeyboardArrowDown />
            {open ? <UserDropdown /> : null}
        </div>
    )
}

function UserDropdown() {
    return (
        <div className='UserDropdown'>
            <button onClick={signOut}>Log Out</button>
        </div>
    )
}