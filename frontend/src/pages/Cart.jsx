import { useState } from "react"
import { useCart } from "../context/CartContext"
import products from "../data/products"
import { Link } from "react-router-dom"
import { FaWhatsapp } from "react-icons/fa"

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart } = useCart()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const itemsWithData = cart.map(item => {
    const product = products.find(p => p.id === item.id)
    return {
      ...item,
      image: product?.image || "",
      price: product?.price || item.price
    }
  })

  const total = itemsWithData.reduce((sum, item) => sum + item.price * item.qty, 0)

  const handleCheckout = () => {
    if (!name.trim() || !phone.trim()) {
      alert("Please enter your name and phone number before checkout.")
      return
    }

    const orderLines = itemsWithData
      .map(item => `${item.name} x${item.qty} - KSh ${item.price * item.qty}`)
      .join("\n")

    const message = `Hello, my name is ${name}.\nPhone: ${phone}\n\nI'd like to order:\n${orderLines}\n\nTotal: KSh ${total}`

    const encoded = encodeURIComponent(message)
    const sellerPhone = "254746415223" // ✅ Replace with seller's WhatsApp number
    window.open(`https://wa.me/${sellerPhone}?text=${encoded}`, "_blank")

    clearCart()
  }

  return (
    <div className="container py-5">
      {/* ✅ Section Title */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">Your Cart</h2>
        <div className="mx-auto" style={{ width: "60px", height: "3px", background: "#28a745" }}></div>
      </div>

      {itemsWithData.length === 0 ? (
        <div className="text-center py-5">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" 
            alt="Empty Cart" 
            style={{ width: "120px", marginBottom: "20px" }} 
          />
          <h5 className="text-muted">Your cart is empty</h5>
          <Link to="/products" className="btn btn-success mt-3">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {/* ✅ Left: Cart Table */}
          <div className="col-lg-8">
            <div className="table-responsive shadow-sm rounded">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col" style={{ width: "120px" }}>Qty</th>
                    <th scope="col">Price</th>
                    <th scope="col">Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {itemsWithData.map((item) => (
                    <tr key={item.id} className="cart-row">
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="me-3 rounded"
                            style={{ width: "60px", height: "40px", objectFit: "cover" }}
                          />
                          <span className="fw-semibold">{item.name}</span>
                        </div>
                      </td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          className="form-control form-control-sm"
                          style={{ width: "70px" }}
                          onChange={(e) => updateQty(item.id, parseInt(e.target.value, 10))}
                        />
                      </td>
                      <td className="fw-semibold text-success">KSh {item.price}</td>
                      <td className="fw-semibold">KSh {item.price * item.qty}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ✅ Right: Summary + Checkout */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0 sticky-top" style={{ top: "80px" }}>
              <div className="card-body">
                <h5 className="fw-bold mb-3">Your Details</h5>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 7xx xxx xxx"
                  />
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-3">
                  <span className="fw-semibold">Total</span>
                  <span className="fw-bold text-success">KSh {total}</span>
                </div>

                <button
                  className="btn btn-success w-100 mb-2 d-flex align-items-center justify-content-center gap-2"
                  onClick={handleCheckout}
                >
                  <FaWhatsapp /> Send Order via WhatsApp
                </button>

                <Link to="/products" className="btn btn-outline-secondary w-100">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
