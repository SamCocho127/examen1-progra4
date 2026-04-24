import { Link } from "@tanstack/react-router";
import "./Navbar.css";

export default function Navbar() {
	const getLinkClass = ({ isActive }) =>
		isActive ? "navbar__link navbar__link--active" : "navbar__link";

	return (
		<header className="navbar">
			<h2 className="navbar__brand">Programación IV</h2>
			<nav className="navbar__links" aria-label="Navegacion principal">
				<Link to="/" activeOptions={{ exact: true }} className={getLinkClass}>
					Home
				</Link>
				<Link to="/car-parts" className={getLinkClass}>
					Car Parts
				</Link>
			</nav>
		</header>
	);
}
