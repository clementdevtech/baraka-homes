import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ProductViewer360 from "../components/ProductViewer360"
import WhatsAppButton from "../components/WhatsAppButton";

const sampleImages = [
  "/images/house1.jpeg",
  "/images/house2.jpeg",
  "/images/house3.jpeg",
  "/images/house4.jpeg"
]

export default function Home() {
  // ✅ Reviews state
  const [reviews, setReviews] = useState([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(0)

  // ✅ Load saved reviews from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("reviews")
    if (saved) {
      setReviews(JSON.parse(saved))
    }
  }, [])

  // ✅ Save to localStorage whenever reviews change
  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews))
  }, [reviews])

  // ✅ Add new review
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim() || rating === 0) return
    const newReview = { name, message, rating }
    setReviews([newReview, ...reviews]) // newest first
    setName("")
    setMessage("")
    setRating(0)
  }

  // ✅ Render stars helper
  const renderStars = (count, onClick) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        onClick={() => onClick && onClick(i + 1)}
        style={{
          cursor: onClick ? "pointer" : "default",
          color: i < count ? "#ffc107" : "#e4e5e9",
          fontSize: "1.2rem",
          marginRight: "2px"
        }}
      >
        ★
      </span>
    ))
  }

  return (
    <div>
      {/* ✅ Hero */}
      <section className="bg-success text-white text-center py-5">
        <div className="container">
          <h1 className="display-3 fw-bold">Welcome to BarakaHomes</h1>
          <p className="lead mb-4">
            Your trusted partner in buying and selling homes with over 10 years in our journey.
          </p>
          <Link to="/properties" className="btn btn-light btn-lg px-4">
            View Properties
          </Link>
        </div>
      </section>

      {/* ✅ 360° Viewer Section */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="fw-bold">Explore Homes</h2>
            <p className="text-muted">
              Step inside your dream home without leaving your seat. Rotate, zoom,
              and experience every corner with our interactive house tours.
            </p>
            <Link to="/properties" className="btn btn-success mt-3">Browse Listings</Link>
          </div>
          <div className="col-md-6 text-center">
            <div className="border rounded shadow p-3 bg-light">
              <ProductViewer360 images={sampleImages} />
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Why Choose Us */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Why Choose BarakaHomes?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="fw-bold">Immersive Tours</h5>
                  <p className="text-muted">Walk through properties virtually before scheduling a visit.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="fw-bold">Trusted Agents</h5>
                  <p className="text-muted">Our experienced team ensures a smooth buying or selling process.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="fw-bold">Property Transformations</h5>
                  <p className="text-muted">Visualize home upgrades and renovations with advanced 3D tools.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Featured Properties */}
      <section className="container py-5">
        <h2 className="fw-bold mb-4 text-center">Featured Homes</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <img src="/images/house1.jpeg" className="card-img-top" alt="Luxury Villa" />
              <div className="card-body">
                <h5 className="card-title">Luxury Villa</h5>
                <p className="text-success fw-bold">✨ Contact us for exclusive details</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <img src="/images/house2.jpeg" className="card-img-top" alt="Modern Apartment" />
              <div className="card-body">
                <h5 className="card-title">Modern Apartment</h5>
                <p className="text-success fw-bold">🏡 Unlock the hidden offer</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <img src="/images/house3.jpeg" className="card-img-top" alt="Townhouse" />
              <div className="card-body">
                <h5 className="card-title">Stylish Townhouse</h5>
                <p className="text-success fw-bold">📞 Call us today to discover more</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <Link to="/properties" className="btn btn-outline-success btn-lg">See All Listings</Link>
        </div>
      </section>

      {/* ✅ Reviews Section */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="fw-bold mb-4 text-center">Client Reviews</h2>

          {/* Reviews List */}
          <div className="row g-4 mb-4">
            {reviews.length === 0 ? (
              <p className="text-center text-muted">No reviews yet. Be the first to share your experience!</p>
            ) : (
              reviews.map((r, i) => (
                <div className="col-md-4" key={i}>
                  <div className="p-4 border rounded shadow-sm bg-white h-100">
                    <div className="mb-2">{renderStars(r.rating)}</div>
                    <p>"{r.message}"</p>
                    <h6 className="fw-bold">— {r.name}</h6>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Review Form */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Leave a Review</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Your Rating</label>
                  <div>{renderStars(rating, setRating)}</div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Your Review</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-success">Submit Review</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Call to Action */}
      <section className="text-center bg-success text-white py-5">
        <div className="container">
          <h2 className="fw-bold">Ready to Find Your Dream Home?</h2>
          <p className="lead">Browse listings or talk to our experts today.</p>
          <Link to="/properties" className="btn btn-light btn-lg">Explore Homes</Link>
        </div>
      </section>

      {/* ✅ Floating WhatsApp CTA */}
      <WhatsAppButton phone="254718210424" message="Hello BarakaHomes, I’m interested in your properties!" />
    </div>
  )
}
