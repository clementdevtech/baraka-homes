import { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

export default function Products() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Our Projects</h2>
      <div className="row g-4">
        {products.map((p) => (
          <div className="col-md-4" key={p.id}>
            <ProductCard {...p} onQuickView={() => setSelected(p)} />
          </div>
        ))}
      </div>
      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
