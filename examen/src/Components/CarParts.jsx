import { useEffect, useState } from "react";
import "./CarParts.css";

const API_URL = import.meta.env.VITE_CARPARTS_API_URL;
const ACCESS_KEY = import.meta.env.VITE_JSONBIN_ACCESS_KEY;

export default function CarParts() {
	const [repuestos, setRepuestos] = useState([]);
	const [visible, setVisible] = useState(10);
	const [busqueda, setBusqueda] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		async function cargarRepuestos() {
			try {
				const response = await fetch(API_URL, {
					headers: {
						"X-Access-Key": ACCESS_KEY,
					},
				});

				if (!response.ok) {
					throw new Error("Error al obtener los datos");
				}

				const data = await response.json();
				setRepuestos(data.record.articles || []);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		cargarRepuestos();
	}, []);

	const repuestosFiltrados = repuestos.filter((repuesto) =>
		repuesto.articleProductName.toLowerCase().includes(busqueda.toLowerCase()) ||
		repuesto.articleNo.toLowerCase().includes(busqueda.toLowerCase()) ||
		repuesto.supplierName.toLowerCase().includes(busqueda.toLowerCase())
	);

	const repuestosVisibles = repuestosFiltrados.slice(0, visible);

	return (
		<main>
			<h1>Repuestos</h1>

			<p>
				Mostrando {repuestosVisibles.length} de {repuestosFiltrados.length} artículos
			</p>

			{}
			<input
				className="search-input"
				type="text"
				placeholder="Buscar por nombre, código o proveedor..."
				value={busqueda}
				onChange={(e) => {
					setBusqueda(e.target.value);
					setVisible(10);
				}}
			/>

			{loading && <p>Cargando repuestos...</p>}
			{error && <p>{error}</p>}

			{!loading && !error && (
				<section className="car-parts-list">
					{repuestosVisibles.map((repuesto) => (
						<article className="car-part-card" key={repuesto.articleId}>
							<img
								src={repuesto.s3image}
								alt={repuesto.articleProductName}
							/>

							<div className="car-part-info">
								<h2>{repuesto.articleProductName}</h2>
								<p>{repuesto.articleNo}</p>

								<span>#{repuesto.supplierId}</span>
								<small>{repuesto.supplierName}</small>
							</div>
						</article>
					))}
				</section>
			)}

			{/* BOTÓN VER MÁS */}
			{visible < repuestosFiltrados.length && (
				<button onClick={() => setVisible(visible + 10)}>
					Ver más
				</button>
			)}
		</main>
	);
}