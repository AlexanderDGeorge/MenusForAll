import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { MdLocalCafe, MdLocalBar, MdLocalDining, MdLocalPizza, MdAirplanemodeActive } from 'react-icons/md';
import { FaLink, FaGithub, FaLinkedinIn, FaHamburger, FaFish, FaLeaf } from 'react-icons/fa';
import { SearchBar } from './Search';

export default function Landing() {

    return (
        <section className='Landing'>
            <NavBar />
            <Search />
            <Categories />
            <Credits />
        </section>
    )
}

function Search () {
    return (
        <section className='Landing-Search'>
            <SearchBar />
        </section>
    )
}

function Categories() {

    function CategoryCard({ icon, name }) {
        return (
            <Link to={{ pathname: '/search', state: { keyword: name }}} className='Landing-Categories-Card'>
                {icon}
                {name}
            </Link>
        )
    }

    return (
        <section className='Landing-Categories'>
            <h2>Search by Category</h2>
            <div>
                <CategoryCard icon={<MdLocalCafe />} name={'Cafes'}/>
                <CategoryCard icon={<FaHamburger />} name={'Burgers'}/>
                <CategoryCard icon={<MdLocalBar />} name={'Bars'} />
                <CategoryCard icon={<MdLocalDining />} name={'Restaurants'}/>
                <CategoryCard icon={<MdLocalPizza />} name={'Pizza'}/>
                <CategoryCard icon={<FaFish />} name={'Seafood'} />
                <CategoryCard icon={<MdAirplanemodeActive />} name={'International'} />
                <CategoryCard icon={<FaLeaf />} name={'Vegetarian'} />
            </div>
        </section>
    )
}

function Credits() {
    return (
        <section className="Credits">
            <p>Hi! I'm looking for a job. Check me out!</p>
            <div className="links">
                <a href="https://github.com/AlexanderDGeorge">
                    <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/alexander-george-410466151/">
                    <FaLinkedinIn />
                </a>
                <a href="https://alexgeorge.dev">
                    <FaLink />
                </a>
            </div>
        </section>
    )
}