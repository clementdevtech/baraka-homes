import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto">
      <div className="container">
        {/* ✅ Company Info */}
        <p className="mb-1">
          &copy; {new Date().getFullYear()} <strong>Baraka Homes</strong>. All Rights Reserved.
        </p>
        <p className="small mb-3">
          Your trusted real estate partner in Nairobi suburbs.
        </p>

        {/* ✅ Social Media Links */}
        <div className="d-flex justify-content-center gap-3">
          <a
            href="https://www.facebook.com/profile.php?id=100066789136859&mibextid=rS40aB7S9Ucbxw6v"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-5"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/barakahomes37?igsh=MWwxbzN4bHlrNW55ag=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-5"
          >
            <FaInstagram />
          </a>
          <a
            href="https://wa.me/254718210424"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-5"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </footer>
  );
}
