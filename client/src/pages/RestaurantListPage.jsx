import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RestaurantListPage() {

	const [restaurants, setRestaurants] = useState(null);
	const { postcode } = useParams(null);

	const getRestaurants = async () => {
		try {
			// const res = await axios.get('test url');
			const res = await axios.get(`http://localhost:8080/restaurants/${postcode}`);
			setRestaurants(res.data.restaurants);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getRestaurants();
	}, [])

	return (
		<>
			<h1>List of restaurants</h1>
			{restaurants == null
			? <p>Loading...</p>
			// : <p>Loading complete!</p>
			: restaurants.map(r => (
				<h1 key={r.id}>{r.name}</h1>
			))
			}
		</>
		

	)
}

export default RestaurantListPage