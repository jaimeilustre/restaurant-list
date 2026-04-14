import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function HomePage() {

	const [searchPostcode, setSearchPostcode] = useState('');
	const navigate = useNavigate();

	const searchHandler = (e) => {
		setSearchPostcode(e.target.value);
	}

	const searchButtonHandler = (e) => {
		if (searchPostcode != "") {
			navigate(`restaurants/${searchPostcode}`);
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
		</>
	)
}

export default HomePage