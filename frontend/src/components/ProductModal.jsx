import ProductViewer360 from "./ProductViewer360";

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ background: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{product.name}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <ProductViewer360 images={product.images || [product.image]} />
            <p className="mt-3">{product.desc}</p>
            <p className="fw-bold text-primary">
              Deposit Required: KSh {product.deposit}
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}