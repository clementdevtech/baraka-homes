import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../../api"

export default function ManageProducts() {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products")
      setProducts(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return
    try {
      await API.delete(`/products/${id}`)
      setProducts(products.filter((p) => p._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h2>Manage Products</h2>
      <Link to="/admin/products/new" className="btn btn-primary mb-3">
        + New Product
      </Link>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.location}</td>
              <td>
                <Link
                  to={`/admin/products/edit/${p._id}`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}