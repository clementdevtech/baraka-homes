import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import fetchProducts from "../data/products"; // your fetchProducts API

export default function Gallery() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);

  // Fetch products from backend
  useEffect(() => {
    fetchProducts()
      .then((data) => data && setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  // Open gallery modal
  const openGallery = (product) => {
    setSelected(product);
    setImgIndex(0);
  };

  // Next/Prev image handlers
  const nextImage = () => {
    if (!selected) return;
    const currentImages = selected.images?.length ? selected.images : [selected.image];
    setImgIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    if (!selected) return;
    const currentImages = selected.images?.length ? selected.images : [selected.image];
    setImgIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (!selected) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);

  if (loading) return <p className="text-center py-5">Loading projects...</p>;

  return (
    <div>
      {/* Banner */}
      <section className="bg-success text-white text-center py-5">
        <h1 className="display-4 fw-bold">Project Gallery</h1>
        <p className="lead">Explore real estate projects and developments.</p>
      </section>

      {/* Masonry Grid */}
      <section className="container py-5">
        <div className="row g-4">
          {products.map((product) => (
            <div className="col-sm-6 col-md-4" key={product.id}>
              <div
                className="card shadow-sm h-100 gallery-card"
                style={{ cursor: "pointer" }}
                onClick={() => openGallery(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <p className="fw-bold small mb-1">{product.name}</p>
                  <p className="text-muted small">{product.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Modal
        show={!!selected}
        onHide={() => {
          setSelected(null);
          setImgIndex(0);
        }}
        centered
        size="lg"
      >
        {selected && (() => {
          const currentImages = selected.images?.length ? selected.images : [selected.image];
          return (
            <>
              <Modal.Body className="p-0 text-center">
                <img
                  src={currentImages[imgIndex]}
                  alt={selected.name}
                  className="img-fluid w-100"
                  style={{ maxHeight: "70vh", objectFit: "contain" }}
                />
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-between align-items-center w-100">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={prevImage}
                  disabled={currentImages.length <= 1}
                >
                  ◀ Prev
                </button>
                <p className="mb-0 small text-muted text-center">
                  {selected.name} – {selected.location}
                  <br />
                  Image {imgIndex + 1} of {currentImages.length}
                </p>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={nextImage}
                  disabled={currentImages.length <= 1}
                >
                  Next ▶
                </button>
              </Modal.Footer>
            </>
          );
        })()}
      </Modal>
    </div>
  );
}
