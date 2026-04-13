import { useEffect, useState } from 'react';
import axios from 'axios';

function RestaurantListPage() {

	const [restaurants, setRestaurants] = useState(null);

	const getRestaurants = async () => {
		try {
			const res = await axios.get('test url');
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