import axios from 'axios';

export const zomatoRequest = axios.create({
	baseURL: 'https://developers.zomato.com/api/v2.1',
	headers: {
		'user-key': process.env.REACT_APP_ZOMATO_KEY,
	},
});

export async function storeLocation() {
	function getCurrentPosition() {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});
	}

	const position = await getCurrentPosition();
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;
	localStorage.setItem('lat', JSON.stringify(lat));
	localStorage.setItem('lon', JSON.stringify(lon));
}
