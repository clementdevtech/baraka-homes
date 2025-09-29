import { useState } from "react";
import { Modal } from "react-bootstrap";
import products from "../data/products"; // ✅ import your products.js

export default function Gallery() {
const [selected, setSelected] = useState(null);
const [imgIndex, setImgIndex] = useState(0);

const openGallery = (product) => {
setSelected(product);
setImgIndex(0);
};

const nextImage = () => {
if (!selected) return;
setImgIndex((prev) => (prev + 1) % selected.images.length);
};

const prevImage = () => {
if (!selected) return;
setImgIndex(
(prev) => (prev - 1 + selected.images.length) % selected.images.length
);
};

return ( <div>
{/* ✅ Banner */} <section className="bg-success text-white text-center py-5"> <h1 className="display-4 fw-bold">Project Gallery</h1> <p className="lead">Explore real estate projects and developments.</p> </section>

```
  {/* ✅ Masonry Grid */}
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

  {/* ✅ Lightbox Modal */}
  <Modal
    show={!!selected}
    onHide={() => setSelected(null)}
    centered
    size="lg"
  >
    {selected && (
      <>
        <Modal.Body className="p-0 text-center">
          <img
            src={selected.images?.[imgIndex] || selected.image}
            alt={selected.name}
            className="img-fluid w-100"
            style={{ maxHeight: "70vh", objectFit: "contain" }}
          />
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between align-items-center w-100">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={prevImage}
          >
            ◀ Prev
          </button>
          <p className="mb-0 small text-muted">
            {selected.name} – {selected.location}
            <br />
            <span>
              Image {imgIndex + 1} of {selected.images?.length || 1}
            </span>
          </p>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={nextImage}
          >
            Next ▶
          </button>
        </Modal.Footer>
      </>
    )}
  </Modal>
</div>


);
}
