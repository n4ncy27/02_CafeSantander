// Archivo: Productos.jsx
// Página: Catálogo completo de productos.
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import useCart from '../hooks/useCart';
import { productoService } from '../services/productoService';
import '../styles/global.css';

const Productos = () => {
	const [products, setProducts] = useState([]);
	const { addItem } = useCart();

	useEffect(() => {
		let mounted = true;
		productoService.obtenerProductos()
			.then(data => { if (mounted) setProducts(data || []); })
			.catch(err => { console.error('Error cargando productos:', err); });
		return () => { mounted = false; };
	}, []);

	// delegado para añadir producto (se pasa a ProductCard)
	const handleAdd = (p) => {
		// useCart expects an object with at least `id` property (numeric)
		addItem({ id: p.id });
	};

	return (
		<div className="main-container">
			<Header />
			<main className="page-main container">
				<h2 className="section-title">Catálogo de Productos</h2>
				<div className="products-grid">
					{products.map(p => (
						<ProductCard key={p.id} product={p} onAdd={handleAdd} />
					))}
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Productos;
