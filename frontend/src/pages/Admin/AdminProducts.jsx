import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../../api"

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])

  const fetchProducts = async () => {
    const res = await API.get("/api/products")
    setProducts(res.data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("price", price)
    formData.append("description", description)
    images.forEach((img) => formData.append("images", img))

    await API.post("/api/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    await fetchProducts()
    setName("")
    setPrice("")
    setDescription("")
    setImages([])
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return
    await API.delete(`/api/products/${id}`)
    setProducts(products.filter((p) => p._id !== id))
  }

  return (
    <div>
      <h2>Manage Products</h2>

      {/* Quick Add Product (optional) */}
      <form onSubmit={handleAdd} className="mb-4" encType="multipart/form-data">
        <div className="mb-2">
          <input
            className="form-control"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <input
            className="form-control"
            placeholder="Price (e.g. 5M - 10M)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <textarea
            className="form-control"
            placeholder="Detailed Description / Statement"
            rows="8"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <small className="text-muted">
            Tip: Paste your full property statement here.
          </small>
        </div>

        <div className="mb-2">
          <label className="form-label">Upload Images</label>
          <input
            type="file"
            className="form-control"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Add Product
        </button>
      </form>

      {/* Product List */}
      <ul className="list-group">
        {products.map((p) => (
          <li key={p._id} className="list-group-item d-flex flex-column mb-2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{p.name}</strong> <span>{p.price}</span>
              </div>
              <div>
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
              </div>
            </div>
            <p className="mt-2">{p.description?.substring(0, 200)}...</p>
            {p.images && p.images.length > 0 && (
              <div className="d-flex flex-wrap mt-2 gap-2">
                {p.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={`data:${img.contentType};base64,${img.data}`}
                    alt="product"
                    style={{
                      width: "120px",
                      height: "90px",
                      objectFit: "cover",
                      border: "1px solid #ccc",
                    }}
                  />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
