import { useState, useMemo } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

export default function Products() {
const [selected, setSelected] = useState(null);
const [location, setLocation] = useState("All");
const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");

// Extract unique locations from dataset
const locations = useMemo(() => {
const unique = new Set(products.map((p) => p.location));
return ["All", ...unique];
}, []);

// Filter logic
const filteredProducts = useMemo(() => {
return products.filter((p) => {
const inLocation = location === "All" || p.location === location;
const inPrice =
(!minPrice || (p.price && p.price >= parseInt(minPrice))) &&
(!maxPrice || (p.price && p.price <= parseInt(maxPrice)));
return inLocation && inPrice;
});
}, [products, location, minPrice, maxPrice]);

return ( <div className="container py-5"> <h2 className="mb-4">Our Projects</h2>


  {/* Filters */}
  <div className="row mb-4 g-3">
    <div className="col-md-4">
      <label className="form-label">Filter by Location</label>
      <select
        className="form-select"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        {locations.map((loc, i) => (
          <option key={i} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>

    <div className="col-md-4">
      <label className="form-label">Min Price (KES)</label>
      <input
        type="number"
        className="form-control"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="e.g. 5000000"
      />
    </div>

    <div className="col-md-4">
      <label className="form-label">Max Price (KES)</label>
      <input
        type="number"
        className="form-control"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="e.g. 20000000"
      />
    </div>
  </div>

  {/* Product Grid */}
  <div className="row g-4">
    {filteredProducts.map((p, index) => (
      <div className="col-md-4" key={`${p.id}-${index}`}>
        <ProductCard product={p} onQuickView={setSelected} />
      </div>
    ))}
  </div>

  {/* Modal */}
  <ProductModal product={selected} onClose={() => setSelected(null)} />
</div>


);
}
