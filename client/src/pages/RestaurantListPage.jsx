import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RestaurantListPage() {

	const [restaurants, setRestaurants] = useState(null);
	const { postcode } = useParams(null);

	const backendUrl = import.meta.env.VITE_BACKEND_URL;

	const getRestaurants = async () => {
		try {
			const res = await axios.get(`${backendUrl}${postcode}`);
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
			: restaurants.map(restaurant => (
				<div key={restaurant.id}>
					<h1>{restaurant.name}</h1>
					<h2>{restaurant.cuisines?.map(c => c.name).join(', ')}</h2>
					<h2>{restaurant.rating?.starRating} ({restaurant.rating?.count})</h2>
					<h2>{restaurant.address?.firstLine}</h2>
					<h2>{restaurant.address?.postalCode}</h2>
					<h2>{restaurant.address?.city}</h2>
				</div>
			))
			}
		</>
	)
}

export default RestaurantListPage