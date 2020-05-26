import axios from 'axios';

export const zomatoRequest = axios.create({
	baseURL: 'https://developers.zomato.com/api/v2.1',
	headers: {
		'user-key': process.env.REACT_APP_ZOMATO_KEY,
	},
});

export const getLocation = () => {
	if ('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(async function handle(
			position
		) {
			let lat = position.coords.latitude;
			let lon = position.coords.longitude;
			localStorage.setItem('lat', JSON.stringify(lat));
			localStorage.setItem('lon', JSON.stringify(lon));
		});
	} else {
		console.log('no geolocation');
	}
};
