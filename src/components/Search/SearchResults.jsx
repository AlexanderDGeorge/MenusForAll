import React, { useContext, useEffect } from 'react';
import { ResultsContext } from '../Application';

export default function SearchResults() {

    const { results } = useContext(ResultsContext);

    useEffect(() => {
        console.log(results);
    }, [results])

    if (results) {
        const { restaurants } = results.data;
        window.restaurants = restaurants;
        return (
            <section className='Search-Results'>
                {restaurants.map((restaurant, i) => 
                    <SearchResult restaurant={restaurant} key={i}/>
                )}
            </section>
        )
    } else {
        console.log('no results');
        return <EmptyResults />
    }
}

function SearchResult(props) {

    const { restaurant } = props.restaurant;
    // const [id] = useState(restaurant.id);

    console.log(restaurant);

    function Cost(num) {
        return (
            <div className='SR-cost'>
                <p style={num >= 1 ? { color: 'var(--dark)' } : { color: 'var(--light)'}}>$</p>
                <p style={num >= 2 ? { color: 'var(--dark)' } : { color: 'var(--light)'}}>$</p>
                <p style={num >= 3 ? { color: 'var(--dark)' } : { color: 'var(--light)'}}>$</p>
                <p style={num >= 4 ? { color: 'var(--dark)' } : { color: 'var(--light)'}}>$</p>
            </div>
        )
    }

    return (
        <section className='Search-Result'>
            <div className='SR-img'>
                <img src={restaurant.featured_image} alt=""/>
            </div>
            <h2 className='SR-name'>{restaurant.name}</h2>
            <div className='SR-rating'>
                {restaurant.user_rating.aggregate_rating}
            </div>
            {Cost(restaurant.price_range)}
            <p className='SR-cuisines'>{restaurant.cuisines}</p>
            <p className='SR-tags'>{restaurant.highlights}</p>
            <div className='SR-info'>
                <p>{restaurant.phone_numbers}</p>
                <p>{restaurant.location.address}</p>
            </div>
            <p className='SR-label'> Average Rating</p>
        </section>
    )
}

function EmptyResults() {
    return (
        <section className='Empty-Results'>
            <h1>NO RESULTS</h1>
        </section>
    )
}