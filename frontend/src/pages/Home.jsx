import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ProductViewer360 from "../components/ProductViewer360"
import WhatsAppButton from "../components/WhatsAppButton"

const sampleImages = [
  "/images/house1.jpeg",
  "/images/house2.jpeg",
  "/images/house3.jpeg",
  "/images/house4.jpeg"
]

// 👇 Directions for alternating animations
const directions = [
  { y: 40, opacity: 0 }, // fade in from bottom
  { x: -40, opacity: 0 }, // fade in from left
  { x: 40, opacity: 0 }, // fade in from right
  { y: -40, opacity: 0 } // fade in from top
]

export default function Home() {
  const [reviews, setReviews] = useState([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem("reviews")
    if (saved) {
      setReviews(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews))
  }, [reviews])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim() || rating === 0) return
    const newReview = { name, message, rating }
    setReviews([newReview, ...reviews])
    setName("")
    setMessage("")
    setRating(0)
  }

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
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.3 }}
    >
      {/* ✅ Hero */}
      <motion.section
        initial={{ y: -60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="bg-success text-white text-center py-5"
      >
        <div className="container">
          <h1 className="display-3 fw-bold">Welcome to BarakaHomes</h1>
          <p className="lead mb-4">
            Your trusted partner in buying and selling homes with over 10 years
            in our journey.
          </p>
          <Link to="/products" className="btn btn-light btn-lg px-4">
            View Properties
          </Link>
        </div>
      </motion.section>

      {/* ✅ 360° Viewer Section */}
      <motion.section
        initial={directions[0]}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="container py-5"
      >
        <div className="row align-items-center">
          <motion.div
            initial={directions[1]}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="col-md-6 mb-4 mb-md-0"
          >
            <h2 className="fw-bold">Explore Homes</h2>
            <p className="text-muted">
              Step inside your dream home without leaving your seat. Rotate,
              zoom, and experience every corner with our interactive house
              tours.
            </p>
            <Link to="/gallery" className="btn btn-success mt-3">
              Browse Listings
            </Link>
          </motion.div>
          <motion.div
            initial={directions[2]}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="col-md-6 text-center"
          >
            <div className="border rounded shadow p-3 bg-light">
              <ProductViewer360 images={sampleImages} />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ✅ Why Choose Us */}
      <motion.section
        initial={directions[3]}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="bg-light py-5"
      >
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Why Choose BarakaHomes?</h2>
          <div className="row g-4">
            {[
              {
                title: "Immersive Tours",
                text: "Walk through properties virtually before scheduling a visit."
              },
              {
                title: "Trusted Agents",
                text: "Our experienced team ensures a smooth buying or selling process."
              },
              {
                title: "Property Transformations",
                text: "Visualize home upgrades and renovations with advanced 3D tools."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={directions[idx % directions.length]}
                whileInView={{ x: 0, y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="col-md-4"
              >
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="fw-bold">{item.title}</h5>
                    <p className="text-muted">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ✅ Featured Properties */}
      <motion.section
        initial={directions[0]}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="container py-5"
      >
        <h2 className="fw-bold mb-4 text-center">Featured Homes</h2>
        <div className="row g-4">
          {[
            {
              img: "/images/house1.jpeg",
              title: "Luxury Villa",
              text: "✨ Contact us for exclusive details"
            },
            {
              img: "/images/house2.jpeg",
              title: "Modern Apartment",
              text: "🏡 Unlock the hidden offer"
            },
            {
              img: "/images/house3.jpeg",
              title: "Stylish Townhouse",
              text: "📞 Call us today to discover more"
            }
          ].map((home, idx) => (
            <motion.div
              key={idx}
              initial={directions[idx % directions.length]}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="col-md-4"
            >
              <div className="card shadow-sm h-100">
                <img src={home.img} className="card-img-top" alt={home.title} />
                <div className="card-body">
                  <h5 className="card-title">{home.title}</h5>
                  <p className="text-success fw-bold">{home.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link to="/gallery" className="btn btn-outline-success btn-lg">
            See All Listings
          </Link>
        </div>
      </motion.section>

      {/* ✅ Reviews Section */}
      <motion.section
        initial={directions[2]}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="bg-light py-5"
      >
        <div className="container">
          <h2 className="fw-bold mb-4 text-center">Client Reviews</h2>
          <div className="row g-4 mb-4">
            {reviews.length === 0 ? (
              <p className="text-center text-muted">
                No reviews yet. Be the first to share your experience!
              </p>
            ) : (
              reviews.map((r, i) => (
                <motion.div
                  key={i}
                  initial={directions[i % directions.length]}
                  whileInView={{ x: 0, y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="col-md-4"
                >
                  <div className="p-4 border rounded shadow-sm bg-white h-100">
                    <div className="mb-2">{renderStars(r.rating)}</div>
                    <p>"{r.message}"</p>
                    <h6 className="fw-bold">— {r.name}</h6>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <motion.div
            initial={directions[1]}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="card shadow-sm"
          >
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
                <button type="submit" className="btn btn-success">
                  Submit Review
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ✅ Call to Action */}
      <motion.section
        initial={directions[0]}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="text-center bg-success text-white py-5"
      >
        <div className="container">
          <h2 className="fw-bold">Ready to Find Your Dream Home?</h2>
          <p className="lead">Browse listings or talk to our experts today.</p>
          <Link to="/properties" className="btn btn-light btn-lg">
            Explore Homes
          </Link>
        </div>
      </motion.section>

      {/* ✅ Floating WhatsApp CTA */}
      <motion.div
        initial={directions[3]}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <WhatsAppButton
          phone="254718210424"
          message="Hello BarakaHomes, I’m interested in your properties!"
        />
      </motion.div>
    </motion.div>
  )
}