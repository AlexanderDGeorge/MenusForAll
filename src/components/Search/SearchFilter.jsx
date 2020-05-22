import React, { useState, useContext } from 'react';
import { Toggle } from '../Components';
import { SearchParamsContext, ResultsContext } from '../Application';
import { zomatoRequest } from '../../utilities';


const CATEGORIES = {
    'Delivery': 1, 'Dine-in': 2, 'Take-out': 5, 'Cafes': 6, 'Breakfast': 8,
    'Lunch': 9, 'Dinner': 10, 'Bars': 11, 'Clubs': 14, 'Nightlife': 3
}

const CUISINES = {
    'American': 1, 'Asian': 3, 'BBQ': 193, 'Bagels': 955,
    'Beverages': 270, 'Bubble Tea': 247, 'Burgers': 168, 'Cajun': 491, 
    'Chili': 971, 'Chinese': 25, 'Coffee/Tea': 161, 'Desserts': 100, 
    'Donuts': 959, 'European': 38, 'Fast Food': 40, 'Fish and Chips': 298,
    'Frozen Yogurt': 501, 'Fusion': 274, 'German': 134, 'Greek': 156, 
    'Grill': 181, 'Hawaiian': 521, 'Healthy': 143, 'Ice Cream': 233, 
    'Indian': 148, 'International': 154, 'Italian': 55, 'Japanese': 60, 
    'Juices': 164, 'Korean': 67, 'Latin': 136, 'Mediterranean': 70,
    'Mexican': 73, 'Middle Eastern': 137, 'Pizza': 82, 'Ramen': 320, 
    'Salad': 998, 'Sandwich': 304, 'Seafood': 83, 'Soul Food': 461, 
    'Southern': 471, 'Steak': 141, 'Sushi': 177, 'Tea': 163, 'Teriyaki': 964, 
    'Tex-Mex': 150, 'Thai': 95, 'Vegetarian': 308, 'Vietnamese': 99
}

const ESTABLISHMENTS = {
    'Quick Bites': 21, 'Sandwich Shop': 271, 'Cafe': 1, 'Fast Food': 281, 
    'Bar': 7, 'Casual Dining': 16, 'Deli': 24, 'Bakery': 31, 'Fine Dining': 18, 
    'Pizzeria': 275, 'Diner': 101, 'Lounge': 5, 'Wine Bar': 278, 'Pub': 6, 
    'Coffee Shop': 286, 'Dessert Parlour': 23, 'Club': 8, 'Bistro': 91, 
    'Fast Casual': 285, 'Brewery': 283, 'Juice Bar': 284, 'Food Court': 20, 
    'Taqueria': 282, 'Noddle Shop': 295,'Beer Garden': 292, 'Steakhouse': 309, 
    'Cocktail Bar': 272, 'Beverage Shop': 41, 'Sweet Shop': 291, 'Food Truck': 81,
    'Izakaya': 294, 'Microbrewery': 161, 'Vineyard': 290, 'Shack': 293
}

export default function SearchFilter() {

    const [showAdvanced, setShowAdvanced] = useState(false);
    const { setResults } = useContext(ResultsContext);
    const { lat, lon, cityID, radius, cuisines, categories, 
        establishment, query, sort, setSort, order
    } = useContext(SearchParamsContext);

    async function handleSearch() {
    
        let searchString = `/search?
            ${lat ? `lat=${lat}` : `entity_id=${cityID}&entity_type=city`}&
            ${lon ? `lon=${lon}&` : ''}
            ${radius ? `radius=${radius}&` : ''}
            ${cuisines ? `cuisines=${cuisines.forEach((num, i) => {
                if (i === cuisines.length) return num
                else return `${num},`
            })}&` : ''}
            ${categories ? `category=${categories.forEach((num, i) => {
                if (i === categories.length) return num
                else return `${num},`
            })}&` : ''}
            ${establishment ? `establishment_type=${establishment}&` : ''}
            ${query ? `q=${query}&` : ''}
            sort=${sort}&
            order=${order}
        `;
        
        // delete whitespace from string
        searchString = searchString.replace(/\s/g, '');

        const response = await zomatoRequest.get(searchString);
        setResults(response);
    }

    return (
        <section className='Search-Filter'>
            <section>
                <h3>Filters</h3>
                <div className='SF-toggleArea'>
                    Advanced Filters
                    <Toggle toggle={showAdvanced} setToggle={setShowAdvanced} size={25}/>
                </div>
                <div className='SF-toggleArea'>
                    Sort By
                    <select onChange={e => setSort(e.target.value)}>
                        <option value="rating" defaultValue>rating</option>
                        <option value="cost">cost</option>
                        <option value="real_distance">distance</option>
                    </select>
                </div>
            </section>
            <SearchFilterSection 
                title={'Category'} options={CATEGORIES} type={'checkbox'}
            />
            {showAdvanced ? <section style={{ width: '100%' }}>
                <SearchFilterSection
                    title={'Cuisine'} options={CUISINES} type={'checkbox'}
                />
                <SearchFilterSection 
                    title={'Establishment'} options={ESTABLISHMENTS} type={'radio'}
                />
            </section> : null }
            <button className='SF-submit' onClick={handleSearch}>Apply Filters</button>
        </section>
    )
}

function SearchFilterSection({ title, options, type }) {

    const { setCategories, setCuisines, setEstablishment } = useContext(SearchParamsContext);
    const [selected] = useState([]);

    function handleChange(e) {
        if (type === 'radio') {
            setEstablishment(e.target.value);
        } else {
            let index = selected.indexOf(e.target.value);
            index === -1 ? selected.push(e.target.value) : selected.splice(index, 1);
            title === 'Category' ? setCategories(selected) : setCuisines(selected);
        }
    }


    return (
        <section className='Search-Filter-Section'>
            <h4>{title}</h4>
            {Object.keys(options).map((option, i) => 
                <div key={i}>
                    <input 
                        type={type} id={`${option}${i}`} name={title} 
                        value={options[option]} onChange={handleChange}
                    />
                    <label htmlFor={`${option}${i}`}>{option}</label>
                </div>
            )}
        </section>
    )
}