import { useState } from 'react';

function HomePage() {

	const [searchPostcode, setSearchPostcode] = useState('');

	const searchHandler = (e) => {
		setSearchPostcode(e.target.value);
	}

	return (
		<>
		<h1>Home page</h1>

		<h1>Search by postcode</h1>
			<input
				type="text"
				value={searchPostcode}
				onChange={searchHandler}
				placeholder="Type postcode here"
			/>
		</>
	)
}

export default HomePage