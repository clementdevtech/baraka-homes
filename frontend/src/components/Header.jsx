import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

export default function Header() {
  const { cart } = useCart()
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* ✅ Navbar */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand fw-bold" to="/">Baraka Homes</Link>

          {/* ✅ Mobile Toggle Button */}
          <button
            className="btn btn-outline-light d-lg-none"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>

          {/* ✅ Desktop Menu */}
          <ul className="navbar-nav ms-auto d-none d-lg-flex flex-row gap-3 align-items-center">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/services">Services</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/gallery">Gallery</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            <li className="nav-item">
              <Link className="btn btn-success position-relative" to="/cart">
                Cart
                {itemCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {itemCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* ✅ Mobile Slide-in Menu */}
      <div
        className={`offcanvas-menu ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="offcanvas-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="btn-close ms-auto mb-3"
            onClick={() => setIsOpen(false)}
          ></button>
          <ul className="navbar-nav gap-3">
            <li className="nav-item"><Link className="nav-link" to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/products" onClick={() => setIsOpen(false)}>Products</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/services" onClick={() => setIsOpen(false)}>Services</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blog" onClick={() => setIsOpen(false)}>Blog</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
            <li className="nav-item">
              <Link
                className="btn btn-success position-relative"
                to="/cart"
                onClick={() => setIsOpen(false)}
              >
                Cart
                {itemCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {itemCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ✅ Styles */}
      <style >{`
        .offcanvas-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out;
          z-index: 1050;
        }
        .offcanvas-menu.open {
          transform: translateX(0);
        }
        .offcanvas-content {
          background: #fff;
          width: 250px;
          height: 100%;
          padding: 20px;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
        }
        @media (min-width: 992px) {
          .offcanvas-menu {
            display: none;
          }
        }
      `}</style>
    </>
  )
}