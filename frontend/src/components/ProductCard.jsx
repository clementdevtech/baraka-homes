import { useCart } from "../context/CartContext";

export default function ProductCard({ id, name, deposit, desc, image, onQuickView }) {
  const { addToCart } = useCart();

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={image}
        className="card-img-top"
        alt={name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="card-text text-muted">{desc}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold text-primary">Deposit: {deposit}%</span>
          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={onQuickView}
            >
              Quick View
            </button>
            <button
              className="btn btn-sm btn-success"
              onClick={() => addToCart({ id, name, deposit, qty: 1 })}
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
