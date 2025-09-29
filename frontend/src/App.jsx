import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Services from "./pages/Services"
import Gallery from "./pages/Gallery"
import Blog from "./pages/Blog"
import BlogPost from "./pages/BlogPost"
import Contact from "./pages/Contact"
import Cart from "./pages/Cart"
import "./App.css" // Import custom CSS for transitions

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.pathname}
        classNames="page"
        timeout={500}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  )
}

function App() {
  return (
    <Router>
      <Header />
      <main className="flex-grow-1">
        <AnimatedRoutes />
      </main>
      <Footer />
    </Router>
  )
}

export default App