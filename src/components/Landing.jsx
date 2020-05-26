import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import {
	MdLocalCafe,
	MdLocalBar,
	MdLocalDining,
	MdLocalPizza,
	MdAirplanemodeActive,
} from 'react-icons/md';
import {
	FaLink,
	FaGithub,
	FaLinkedinIn,
	FaHamburger,
	FaFish,
	FaLeaf,
} from 'react-icons/fa';
import { SearchBar } from './Search/Search';
import { SearchParamsContext } from './Application';
import { Message } from './Components';
import { storeLocation } from '../utilities';

export default function Landing() {
	let lat = JSON.parse(localStorage.getItem('lat'));
	let lon = JSON.parse(localStorage.getItem('lon'));

	return (
		<section className="Landing">
			<NavBar />
			<Search />
			<Categories />
			<Credits />
			{lat && lon ? null : (
				<Message
					message="Allow Menus For All to access your location for the best results"
					onClick={storeLocation}
				/>
			)}
		</section>
	);
}

function Search() {
	return (
		<section className="Landing-Search">
			<div className="Landing-Tint"></div>
			<SearchBar />
		</section>
	);
}

function Categories() {
	const { setCuisines, setCategories } = useContext(SearchParamsContext);

	function CategoryCard({ icon, name }) {
		return (
			<Link
				to={{ pathname: '/search', state: { keyword: name } }}
				className="Landing-Categories-Card"
			>
				{icon}
				{name}
			</Link>
		);
	}

	return (
		<section className="Landing-Categories">
			<h2>Search by Category</h2>
			<div>
				<CategoryCard
					onClick={() => setCategories(6)}
					icon={<MdLocalCafe />}
					name={'Cafes'}
				/>
				<CategoryCard
					onClick={() => setCuisines(168)}
					icon={<FaHamburger />}
					name={'Burgers'}
				/>
				<CategoryCard
					onClick={() => setCategories(11)}
					icon={<MdLocalBar />}
					name={'Bars'}
				/>
				<CategoryCard
					onClick={() => setCategories(2)}
					icon={<MdLocalDining />}
					name={'Dine-In'}
				/>
				<CategoryCard
					onClick={() => setCuisines(82)}
					icon={<MdLocalPizza />}
					name={'Pizza'}
				/>
				<CategoryCard
					onClick={() => setCuisines(83)}
					icon={<FaFish />}
					name={'Seafood'}
				/>
				<CategoryCard
					onClick={() => setCuisines(154)}
					icon={<MdAirplanemodeActive />}
					name={'International'}
				/>
				<CategoryCard
					onClick={() => setCuisines(308)}
					icon={<FaLeaf />}
					name={'Vegetarian'}
				/>
			</div>
		</section>
	);
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
	);
}
