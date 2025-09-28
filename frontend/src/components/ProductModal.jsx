import ProductViewer360 from "./ProductViewer360";

export default function ProductModal({ product, onClose }) {
if (!product) return null;

return (
<div
className="modal fade show d-block"
tabIndex="-1"
style={{ background: "rgba(0,0,0,0.6)" }}
> <div className="modal-dialog modal-lg modal-dialog-centered"> <div className="modal-content">
{/* Header */} <div className="modal-header"> <h5 className="modal-title">
{product.name || "Property Details"} </h5> <button
           type="button"
           className="btn-close"
           onClick={onClose}
           aria-label="Close"
         ></button> </div>


      {/* Body */}
      <div className="modal-body">
        <ProductViewer360
          images={
            product.images && product.images.length > 0
              ? product.images
              : [product.image]
          }
        />

        {product.size && (
          <p className="mt-3">
            <strong>Size:</strong> {product.size} sqm
          </p>
        )}

        {product.price && (
          <p>
            <strong>Price:</strong> KES {product.price.toLocaleString()}
          </p>
        )}

        {product.location && (
          <p>
            <strong>Location:</strong> {product.location}
          </p>
        )}

        {/* Payment Plan */}
        {product.paymentPlan && (
          <>
            <h6 className="mt-3">Payment Plan</h6>
            <p>{product.paymentPlan}</p>
          </>
        )}

        {/* Amenities */}
        {product.amenities?.length > 0 && (
          <>
            <h6 className="mt-3">Amenities</h6>
            <ul className="row">
              {product.amenities.map((a, i) => (
                <li className="col-6" key={`amenity-${i}`}>
                  ✅ {a}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Footer */}
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
