export default function Contact() {
  const handleWhatsAppSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    // ✅ Send to backend (email)
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
    } catch (err) {
      console.error("Backend error:", err);
    }

    // ✅ WhatsApp redirect
    const text = `Hello Baraka Homes 👋%0A
Name: ${name}%0A
Email: ${email}%0A
Message: ${message}`;
    const phoneNumber = "254718210424";
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-success fw-bold">Contact Baraka Homes</h2>
      <p className="mb-5">
        Visit us at our offices in <strong>Kilimani, Nairobi (Commando Suites)</strong> or reach us directly through WhatsApp.
      </p>

      <div className="row g-4">
        {/* Info */}
        <div className="col-md-6">
          <p><strong>📞 Phone:</strong> +254 718 210424</p>
          <p><strong>✉️ Email:</strong> sales@barakahomes.com</p>
          <p><strong>📍 Location:</strong> Kilimani, Nairobi – Commando Suites</p>
        </div>

        {/* Form */}
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
              💬 Send via WhatsApp & Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
