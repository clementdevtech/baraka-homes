import { FaWhatsapp } from "react-icons/fa"

export default function Blog() {
  const posts = [
    {
      title: "How We Transform Suburban Living",
      excerpt: "Discover how Baraka Homes redefines real estate solutions in Nairobi’s suburbs with innovation and trust.",
      img: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
      date: "Sept 2025",
      slug: "transform-suburban-living"
    },
    {
      title: "Choosing the Right Home for Your Family",
      excerpt: "Expert tips on selecting the perfect house in Kilimani and nearby suburbs that matches your lifestyle.",
      img: "https://images.pexels.com/photos/534171/pexels-photo-534171.jpeg",
      date: "Aug 2025",
      slug: "choosing-right-home"
    },
    {
      title: "Affordable Housing Solutions in Nairobi",
      excerpt: "How Baraka Homes is making affordable suburban living a reality while ensuring durability and comfort.",
      img: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
      date: "July 2025",
      slug: "affordable-housing"
    }
  ]

  return (
    <div>
      {/* ✅ Banner */}
      <section className="bg-success text-white text-center py-5">
        <h1 className="display-4 fw-bold">Baraka Homes Blog</h1>
        <p className="lead">
          Insights, tips, and stories from Nairobi’s real estate market.
        </p>
      </section>

      {/* ✅ Featured Post */}
      <section className="container py-5">
        <h2 className="fw-bold mb-4 text-center">Featured Story</h2>
        <div className="card shadow-sm border-0">
          <div className="row g-0 align-items-center">
            <div className="col-md-6">
              <img
                src={posts[0].img}
                alt={posts[0].title}
                className="img-fluid rounded-start"
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h3 className="fw-bold">{posts[0].title}</h3>
                <p className="text-muted small">{posts[0].date}</p>
                <p>{posts[0].excerpt}</p>
                <a href={`/blog/${posts[0].slug}`} className="btn btn-success">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Blog Grid */}
      <section className="container py-5">
        <h2 className="fw-bold mb-4 text-center">More Articles</h2>
        <div className="row g-4">
          {posts.slice(1).map((post, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className="card h-100 shadow-sm">
                <img src={post.img} className="card-img-top" alt={post.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold">{post.title}</h5>
                  <p className="text-muted small">{post.date}</p>
                  <p>{post.excerpt}</p>
                  <a
                    href={`/blog/${post.slug}`}
                    className="btn btn-outline-success btn-sm mt-auto"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Floating WhatsApp CTA */}
      <a
        href="https://wa.me/254746415223?text=Hello%20Baraka%20Homes%2C%20I%27d%20like%20to%20know%20more%20about%20your%20properties."
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-success rounded-circle shadow-lg"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px"
        }}
      >
        <FaWhatsapp />
      </a>
    </div>
  )
}
