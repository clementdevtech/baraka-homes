import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Services from "./pages/Services"
import Gallery from "./pages/Gallery"
import Blog from "./pages/Blog"
import BlogDetails from "./pages/BlogDetails"
import Contact from "./pages/Contact"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AdminLayout from "./pages/Admin/AdminLayout"
import AdminBlogForm from "./pages/Admin/AdminBlogForm"
import AdminProducts from "./pages/Admin/AdminProducts"
import AdminServices from "./pages/Admin/AdminServices"
import AdminProductForm from "./pages/Admin/AdminProductForm"
import ProtectedRoute from "./components/ProtectedRoute"
import AuthProvider, { useAuth } from "./context/AuthContext"

import "./App.css"

function AnimatedRoutes() {
  const location = useLocation()
  const { user } = useAuth()

  // ✅ Fix for findDOMNode warning
  const nodeRef = React.useRef(null)

  React.useEffect(() => {
    console.log("📍 Navigated to:", location.pathname)
  }, [location.pathname])

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.pathname}
        classNames="page"
        timeout={500}
        nodeRef={nodeRef}
        onEnter={() => console.log("▶️ Entering:", location.pathname)}
        onEntered={() => console.log("✅ Entered:", location.pathname)}
        onExit={() => console.log("⏹ Exiting:", location.pathname)}
        onExited={() => console.log("❌ Exited:", location.pathname)}
      >
        <div ref={nodeRef}>
          <Routes location={location}>
            {/* Public pages */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />

            {/* Auth pages */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/register"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : user.role !== "admin" ? (
                  <Navigate to="/" replace />
                ) : (
                  <Register />
                )
              }
            />

            {/* Admin Dashboard (protected) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="blogs" element={<div>Manage Blogs</div>} />
              <Route path="blogs/new" element={<AdminBlogForm />} />
              <Route path="blogs/edit/:slug" element={<AdminBlogForm />} />

              <Route path="products" element={<AdminProducts />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="products/new" element={<AdminProductForm />} />
              <Route path="products/edit/:id" element={<AdminProductForm />} />

              <Route path="*" element={<div>Admin Page Not Found</div>} />
            </Route>
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main className="flex-grow-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  )
}

export default App
