import React, { useContext, useEffect } from 'react';
import { ResultsContext } from '../Application';

export default function SearchResults() {

    const { results } = useContext(ResultsContext);

    useEffect(() => {
        console.log(results);
    }, [results])

    if (results) {
        const { restaurants } = results.data;
        console.log(restaurants);
        return (
            <section className='Search-Results'>
                {restaurants.map(restaurant => 
                    <SearchResult restaurant={restaurant} />
                )}
            </section>
        )
    } else {
        console.log('no results');
        return <EmptyResults />
    }
}

function SearchResult({ restaurant }) {
    return (
        <section className='Search-Result'>
            
        </section>
    )
}

function EmptyResults() {
    return (
        <section className='Empty-Results'>

        </section>
    )
}