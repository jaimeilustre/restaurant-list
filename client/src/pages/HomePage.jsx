import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function HomePage() {

	const [searchPostcode, setSearchPostcode] = useState('');
	const [validPostcode, setValidPostcode] = useState(true);
	const navigate = useNavigate();

	const searchHandler = (e) => {
		setSearchPostcode(e.target.value);
	}

	const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$/i;

	const searchButtonHandler = (e) => {
		if (searchPostcode != "") {
			if (postcodeRegex.test(searchPostcode)) {
				navigate(`restaurants/${searchPostcode}`);
			} else {
				setValidPostcode(false);
			}
		} else {
			alert('Please enter a postcode');
		}
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

			<button onClick={searchButtonHandler}>Search</button>

			{!validPostcode && <p>Please enter a valid postcode</p>}
		</>
	)
}

export default HomePage