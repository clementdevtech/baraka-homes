import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import API from "../../api"

export default function AdminProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])
  const [existingImages, setExistingImages] = useState([])

  // Fetch existing product if editing
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await API.get(`/api/products/${id}`)
          setName(res.data.name)
          setPrice(res.data.price)
          setDescription(res.data.description)
          setExistingImages(res.data.images || [])
        } catch (err) {
          console.error(err)
        }
      }
      fetchProduct()
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", name)
    formData.append("price", price)
    formData.append("description", description)
    images.forEach((img) => formData.append("images", img))

    try {
      if (id) {
        await API.put(`/api/products/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      } else {
        await API.post("/api/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      }
      navigate("/admin/products")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h2>{id ? "Edit Product" : "New Product"}</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="text"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Detailed Statement / Description</label>
          <textarea
            className="form-control"
            rows="8"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Images</label>
          <input
            type="file"
            className="form-control"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
          />
          {id && existingImages.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mt-2">
              {existingImages.map((img, idx) => (
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
          <small className="text-muted d-block mt-1">
            Uploading new images will replace the old ones.
          </small>
        </div>

        <button type="submit" className="btn btn-success">
          {id ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  )
}
