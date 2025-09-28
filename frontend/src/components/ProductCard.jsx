import { useCart } from "../context/CartContext";

export default function ProductCard({ product, onQuickView }) {
const { addToCart } = useCart();

return ( <div className="card h-100 shadow-sm">
<img
src={product.image}
className="card-img-top"
alt={product.name}
style={{ height: "200px", objectFit: "cover" }}
/> <div className="card-body d-flex flex-column"> <h5 className="card-title">{product.name}</h5>
{product.size && ( <p className="card-text text-muted">{product.size} sqm</p>
)}
{product.price && ( <p className="card-text text-muted">
KES {product.price.toLocaleString()} </p>
)} <p className="small text-secondary">{product.location}</p> <div className="mt-auto d-flex justify-content-between align-items-center"> <span className="fw-bold text-primary">
{product.paymentPlan || "Flexible Payment Options"} </span> <div className="d-flex gap-2">
<button
className="btn btn-sm btn-outline-secondary"
onClick={() => onQuickView(product)}
>
Quick View </button>
{product.price && (
<button
className="btn btn-sm btn-success"
onClick={() =>
addToCart({
id: product.id,
name: product.name,
price: product.price,
qty: 1,
})
}
>
Reserve </button>
)} </div> </div> </div> </div>
);
}
