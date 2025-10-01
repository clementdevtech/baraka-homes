import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

import fetchProducts from "../data/products"; // fetches from backend
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

const toNumber = (v) => {
  if (v == null) return Infinity;
  if (typeof v === "number") return v;
  const cleaned = String(v).replace(/[^\d.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : Infinity;
};

// Custom slider handle with tooltip
const HandleWithTooltip = ({ value = 0, dragging, index, ...rest }) => {
  const { key, $$typeof, _owner, _store, ...safeProps } = rest;

  // Log unknown props for debugging
  // console.log("Handle props", safeProps);

  return (
    <Tooltip
      prefixCls="rc-tooltip"
      overlay={`KES ${Number(value).toLocaleString()}`}
      visible={dragging}
      placement="top"
      key={key}
    >
      <div {...safeProps} />
    </Tooltip>
  );
};



export default function Products() {
  const MAX_LIMIT = 300_000_000; // 300 million
  const STEP = 100_000; // 100k step

  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [location, setLocation] = useState("All");
  const [maxPrice, setMaxPrice] = useState(MAX_LIMIT);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  // Get unique locations
  const locations = useMemo(() => {
    const unique = new Set(products.map((p) => p.location));
    return ["All", ...unique];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    const max = Number(maxPrice);
    return products.filter((p) => {
      const inLocation = location === "All" || p.location === location;
      const priceNum = toNumber(p.price);
      return inLocation && priceNum <= max;
    });
  }, [products, location, maxPrice]);

  if (loading) return <p className="text-center py-5">Loading projects...</p>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Our Projects</h2>

      {/* Filters */}
      <div className="row mb-4 g-3 align-items-center">
        <div className="col-md-6">
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

        <div className="col-md-6">
          <label className="form-label d-flex justify-content-between">
            <span>Max Price</span>
            <small className="text-success fw-bold">
              {maxPrice >= MAX_LIMIT
                ? "Any"
                : `KES ${maxPrice.toLocaleString()}`}
            </small>
          </label>
          <Slider
            min={0}
            max={MAX_LIMIT}
            step={STEP}
            value={maxPrice}
            handleRender={(nodeProps) => <HandleWithTooltip {...nodeProps} />}
            onChange={(val) => setMaxPrice(val)}
          />

          {maxPrice !== MAX_LIMIT && (
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary mt-2"
              onClick={() => setMaxPrice(MAX_LIMIT)}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="row g-4">
        {filteredProducts.length === 0 ? (
          <div className="col-12">
            <p className="text-center text-muted">
              No projects match your filters.
            </p>
          </div>
        ) : (
          filteredProducts.map((p, index) => {
            const directions = [
              { x: -80, opacity: 0 }, // left
              { x: 80, opacity: 0 },  // right
              { y: 80, opacity: 0 },  // bottom
              { y: -80, opacity: 0 }, // top
            ];
            const initial = directions[index % directions.length];
            return (
              <motion.div
                className="col-md-4"
                key={`${p.id}-${index}`}
                initial={initial}
                whileInView={{ x: 0, y: 0, opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 70,
                }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <ProductCard product={p} onQuickView={setSelected} />
              </motion.div>
            );
          })
        )}
      </div>

      {/* Modal */}
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
