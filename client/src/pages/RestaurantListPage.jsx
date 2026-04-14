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
			setRestaurants(res.data.restaurants.slice(0, 10));
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
			{!restaurants
			? <p>Loading...</p>
			// : <p>Loading complete!</p>
			: restaurants.map(restaurant => (
				// <h1 key={r.id}>{r.name}</h1>
				<div key={restaurant.id}>
					<h1>{restaurant.name}</h1>
					<h1>{restaurant.cuisines?.map(c => c.name).join(', ')}</h1>
					<h1>{restaurant.rating?.starRating} ({restaurant.rating?.count})</h1>
					<h1>{restaurant.address?.firstLine}</h1>
				</div>
			))
			}
		</>
		

	)
}

export default RestaurantListPage