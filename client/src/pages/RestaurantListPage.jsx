import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import star from "../assets/star.svg"

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
			{!restaurants
				? <p>Loading...</p>
				: restaurants.map(restaurant => {
					return (
						<div className="restaurant-card" key={restaurant.id}>
							<div className="restaurant-info">
								<h2>{restaurant.name}</h2>
								<h3>{restaurant.cuisines?.map(c => c.name).join(', ')}</h3>
								<h3>
									<img className="rating-logo" src={star} alt="text" />
									<span>{parseFloat(restaurant.rating?.starRating)}</span>
								</h3>
							</div>

							<div className="restaurant-address">
								<h3>{restaurant.address?.firstLine}</h3>
								<h3>{restaurant.address?.postalCode}</h3>
								<h3>{restaurant.address?.city}</h3>
							</div>
							
						</div>
					)
				})
			}
		</>
	)
}

export default RestaurantListPage