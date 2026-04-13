import { useState } from 'react';

function RestaurantListPage() {

	const [restaurants, setRestaurants] = useState(null);

	return (
		<>
			<h1>List of restaurants</h1>
			{restaurants == null
			? <p>Loading...</p>
			: <p>Loading complete!</p>
			}
		</>
		

	)
}

export default RestaurantListPage