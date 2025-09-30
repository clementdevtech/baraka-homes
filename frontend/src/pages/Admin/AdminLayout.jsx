import { Outlet, Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function AdminLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        className="bg-dark text-light p-3"
        style={{ width: "220px", minHeight: "100vh" }}
      >
        <h4 className="fw-bold mb-4">Admin Panel</h4>
        <ul className="nav flex-column gap-2">
          <li><Link className="nav-link text-light" to="/admin/blogs">Manage Blogs</Link></li>
          <li><Link className="nav-link text-light" to="/admin/products">Manage Products</Link></li>
          <li><Link className="nav-link text-light" to="/admin/services">Manage Services</Link></li>
        </ul>
        <hr className="text-light" />
        <p><strong>{user?.username}</strong> ({user?.role})</p>
        <button className="btn btn-sm btn-danger mt-2" onClick={logout}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4 bg-light">
        <Outlet />
      </main>
    </div>
  )
}

