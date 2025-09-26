export default function Contact() {
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    // ✅ Format the WhatsApp message
    const text = `Hello Baraka Homes 👋%0A
Name: ${name}%0A
Email: ${email}%0A
Message: ${message}`;

    // ✅ Replace with your WhatsApp number
    const phoneNumber = "254718210424"; 

    // ✅ Redirect to WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="container py-5">
      {/* ✅ Page Heading */}
      <h2 className="mb-4 text-success fw-bold">Contact Baraka Homes</h2>
      <p className="mb-5">
        Visit us at our offices in <strong>Kilimani, Nairobi (Commando Suites)</strong> or reach us directly through WhatsApp.  
      </p>

      <div className="row g-4">
        {/* ✅ Contact Info */}
        <div className="col-md-6">
          <p><strong>📞 Phone:</strong> +254 718 210424</p>
          <p><strong>✉️ Email:</strong> sales@barakahomes.com</p>
          <p><strong>📍 Location:</strong> Kilimani, Nairobi – Commando Suites</p>

          {/* ✅ Embedded Google Map */}
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.805158266703!2d36.789!3d-1.292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173c6f3b2bcd%3A0xa1f6e3b6d041c7d!2sKilimani%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1694953425123!5m2!1sen!2ske"
              title="Google Maps"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* ✅ WhatsApp Form */}
        <div className="col-md-6">
          <form onSubmit={handleWhatsAppSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" name="name" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea name="message" className="form-control" rows="4" required></textarea>
            </div>
            <button type="submit" className="btn btn-success w-100">
              💬 Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
