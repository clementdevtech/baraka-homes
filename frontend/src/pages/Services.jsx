export default function Services() {
  return (
    <div>
      {/* ✅ Header Banner */}
      <section className="bg-success text-white text-center py-5">
        <h1 className="display-4 fw-bold">Our Services</h1>
        <p className="lead">
          Comprehensive real estate solutions — buy, sell, rent, and manage properties with ease.
        </p>
      </section>

      {/* ✅ Services Cards */}
      <section className="container py-5">
        <div className="row g-4">
          {/* Property Sales */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <img
                src="/images/house1.jpeg"
                className="card-img-top"
                alt="Property Sales"
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">Property Sales</h5>
                <p className="text-muted">
                  Helping clients find their dream homes in Nairobi’s suburbs. Transparent
                  transactions with trusted guidance every step of the way.
                </p>
              </div>
            </div>
          </div>

          {/* Rentals */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <img
                src="/images/house2.jpeg"
                className="card-img-top"
                alt="Property Rentals"
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">Property Rentals</h5>
                <p className="text-muted">
                  From apartments to family homes, we connect tenants with the right rental
                  properties at the right price, quickly and efficiently.
                </p>
              </div>
            </div>
          </div>

          {/* Property Management */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <img
                src="/images/house3.jpeg"
                className="card-img-top"
                alt="Property Management"
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">Property Management</h5>
                <p className="text-muted">
                  Stress-free property ownership — we handle tenant sourcing, rent collection,
                  maintenance, and reporting for landlords.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ CTA */}
      <section className="bg-light py-5 text-center">
        <h2 className="fw-bold">Looking for Real Estate Solutions?</h2>
        <p className="lead">
          Whether you’re buying, renting, or investing — Baraka Homes is your trusted partner in Nairobi’s suburbs.
        </p>
        <a href="/contact" className="btn btn-success btn-lg">
          Contact Us
        </a>
      </section>
    </div>
  );
}
