import React, { useEffect, useState } from 'react';
import { SearchHeader } from './Search/Search';
import { useLocation } from 'react-router-dom';
import { zomatoRequest } from '../utilities';

export default function Restaurant(props) {

    const location = useLocation();
    const id = location.pathname.slice(8);
    const [restaurant, setRestaurant] = useState(props.location.restaurant);

    console.log(restaurant);

    useEffect(() => {
        if (!restaurant) {
            zomatoRequest.get(`/restaurant?res_id=${id}`).then(
                response => setRestaurant(response.data)
            )
        }
    }, []);

    if (restaurant) {
        return (
            <section className='Restaurant'>
                <SearchHeader />
                <RestaurantDetail restaurant={restaurant}/>
            </section>
        )
    } else {
        return (
            <section className='Restaurant'>
                <SearchHeader />
            </section>
        )
    }
}

function RestaurantDetail({ restaurant }) {
    console.log(restaurant);

    return (
        <section className='Restaurant-Detail'>
            <img src={restaurant.featured_image} alt=""/>
            <h1>{restaurant.name}</h1>
        </section>
    )
}

