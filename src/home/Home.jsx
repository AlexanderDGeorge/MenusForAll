import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collectIdsAndData } from '../utilities';

export default function Home() {

    const [menus, setMenus] = useState(null);

    useEffect(() => {
        async function fetchMenus() {
            const snapshot = await firestore.collection('menus').get();
            setMenus(snapshot.docs.map(collectIdsAndData));
        }
        fetchMenus();
    }, [])

    console.log(menus);

    return (
        <div className='home'>

        </div>
    )
}