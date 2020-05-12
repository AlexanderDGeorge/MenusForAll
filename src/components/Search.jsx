import React from 'react';
import NavBar from './NavBar';
import { useLocation } from 'react-router-dom';

export default function Search(props) {

    console.log(props)
    const location = useLocation();
    console.log(location);

    return (
        <section className='Search'>
            {/* <NavBar /> */}
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
                title={'Category'} optionsArray={['Delivery', 'Dine-out', 
                'Nightlife', 'Cafes', 'Breakfast', 'Lunch', 'Dinner', 'Bars', 
                'Clubs']} type={'checkbox'}
            />
            <SearchFilterSection
                title={'Cuisine'} optionsArray={['American', 'Asian', 'BBQ', 'Bakery',
                'Bar Food', 'Beverages', 'Breakfast', 'Burgers', 'Cafe', 'Cajun', 'Chinese',
                'Coffee', 'Crepes', 'Deli', 'Desserts', 'Diner', 'Donuts', 'Fast Food',
                'Filipino', 'French', 'German', 'Greek', 'Healthy', 'Ice Cream', 'Indian',
                'International', 'Italian', 'Japanese', 'Juices', 'Korean', 'Latin', 'Mediterranean',
                'Mexican', 'Middle Eastern', 'Mongolian', 'New American', 'Pizza', 'Russian', 
                'Salad', 'Sandwich', 'Seafood', 'Southern', 'Steak', 'Sushi', 'Taco', 'Tapas',
                'Tea', 'Teriyaki', 'Tex-Mex', 'Thai', 'Vegetarian', 'Vietnamese']} type={'checkbox'}
            />
            <SearchFilterSection 
                title={'Establishment'} optionsArray={['Quick Bites', 'Sandwich Shop', 'Cafe',
                'Fast Food', 'Bar', 'Casual Dining', 'Deli', 'Bakery', 'Fine Dining', 'Pizzeria',
                'Diner', 'Lounge', 'Wine Bar', 'Pub', 'Coffee Shop', 'Dessert Parlour', 'Club', 
                'Bistro', 'Fast Casual', 'Brewery', 'Juice Bar', 'Food Court', 'Taqueria', 'Noddle Shop',
                'Beer Garden', 'Steakhouse', 'Cocktail Bar', 'Beverage Shop', 'Sweet Shop', 'Food Truck',
                'Izakaya', 'Microbrewery', 'Vineyard', 'Shack']} type={'checkbox'}
            />

        </section>
    )
}

function SearchFilterSection({ title, optionsArray, type }) {

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
