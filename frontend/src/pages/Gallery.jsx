import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function Gallery() {
  const images = [
    { src: "/images/image (1).jpeg", caption: "Residential Project – Kilimani" },
    { src: "/images/image (5).jpeg", caption: "Affordable Housing – Kayole" },
    { src: "/images/image (7).jpeg", caption: "Modern Home – Runda" },
    { src: "/images/image (2).jpeg", caption: "Roof Installation – South B" },
    { src: "/images/image (9).jpeg", caption: "Estate Development – Kitengela" },
    { src: "/images/image (10).jpeg", caption: "Commercial Project – Westlands" }
  ];

  const [selected, setSelected] = useState(null);

  return (
    <div>
      {/* ✅ Banner */}
      <section className="bg-success text-white text-center py-5">
        <h1 className="display-4 fw-bold">Project Gallery</h1>
        <p className="lead">See real projects completed with our mabati products.</p>
      </section>

      {/* ✅ Masonry Grid */}
      <section className="container py-5">
        <div className="row g-4">
          {images.map((img, i) => (
            <div className="col-sm-6 col-md-4" key={i}>
              <div
                className="card shadow-sm h-100 gallery-card"
                style={{ cursor: "pointer" }}
                onClick={() => setSelected(img)}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <p className="text-muted small">{img.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Lightbox Modal */}
      <Modal show={!!selected} onHide={() => setSelected(null)} centered size="lg">
        {selected && (
          <>
            <Modal.Body className="p-0">
              <img
                src={selected.src}
                alt={selected.caption}
                className="img-fluid w-100"
              />
            </Modal.Body>
            <Modal.Footer>
              <p className="mb-0">{selected.caption}</p>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}