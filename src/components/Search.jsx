import React from 'react';
import NavBar from './NavBar';
import { useLocation } from 'react-router-dom';

export default function Search(props) {

    console.log(props)
    const location = useLocation();
    console.log(location);

    return (
        <section className='Search'>
            <NavBar />
            <SearchResults />
            <SearchFilter />
        </section>
    )
}

function SearchResults() {


    return (
        <section className='Search-Results'>

        </section>
    )
}

function SearchFilter() {

    // const keyword, radius, cuisines, categories

    return (
        <section className='Search-Filter'>

            {/* <section style={{justifyContent: 'center'}}>
                <span className='SF-price'>
                    <p>$</p>
                    <p>$$</p>
                    <p>$$$</p>
                    <p>$$$$</p>
                </span>
            </section> */}
            <SearchFilterSection 
                title={'Categories'} optionsArray={['Delivery', 'Dine-out', 
                'Nightlife', 'Cafes', 'Breakfast', 'Lunch', 'Dinner', 'Bars', 
                'Clubs']} type={'checkbox'}
            />
        </section>
    )
}

function SearchFilterSection({ title, optionsArray, type }) {
    // title will be the title of the section
    // optionsArray are the options present in the section

    return (
        <section className='Search-Filter-Section'>
            <h4>{title}</h4>
            {optionsArray.map((option, i) => 
                <div>
                    <input type={type} name={option} key={i}/>
                    {option}
                </div>
            )}
        </section>
    )
}
