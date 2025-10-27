// Archivo: Productos.tsx
// Página: Catálogo completo de productos.
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import useCart from '../hooks/useCart';
import '../styles/global.css';

// Tipo que representa un producto
type Product = { id: number; name: string; description?: string; price: number; image: string };

// Datos de ejemplo del catálogo
const products: Product[] = [
	{ id: 1, name: 'Expreso', description: 'Intenso, aromático y lleno de carácter. El café expreso es una bebida concentrada elaborada al pasar agua caliente a presión por café molido fino.', price: 7000, image: '/imagenes/expreso.png' },
	{ id: 2, name: 'Mocachino', description: 'Deliciosa combinación de café expreso, leche vaporizada y chocolate. Su sabor suave y dulce lo convierte en una opción perfecta.', price: 8000, image: '/imagenes/mocachino.png' },
	{ id: 3, name: 'Latte', description: 'Suave y cremoso: mezcla de café expreso y leche vaporizada, con una ligera capa de espuma en la parte superior.', price: 7000, image: '/imagenes/latte.png' },
	{ id: 4, name: 'Chocolate', description: 'Bebida reconfortante y cremosa elaborada con leche caliente y chocolate derretido.', price: 9000, image: '/imagenes/chocolate.png' },
	{ id: 5, name: 'Pastel de chocolate', description: 'Suave, húmedo y lleno de sabor; ideal para acompañar tu café.', price: 15000, image: '/imagenes/pastelchocolate.png' },
	{ id: 6, name: 'Galletas', description: 'Crujientes por fuera, suaves por dentro y llenas de sabor. El acompañante perfecto para tu bebida caliente.', price: 6000, image: '/imagenes/galletitas.png' }
];

const Productos: React.FC = () => {
	// Hook para agregar items al carrito
	const { addItem } = useCart();

	// delegado para añadir producto (se pasa a ProductCard)
	const handleAdd = (p: Product) => addItem({ id: p.id, name: p.name, description: p.description, price: p.price, image: p.image });

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
