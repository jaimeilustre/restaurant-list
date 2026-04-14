import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<nav>
			<Link to="/">
				<h2>Back to home</h2>
			</Link>
		</nav>
	)
}

export default Navbar