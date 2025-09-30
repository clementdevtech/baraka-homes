import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addProduct, getProduct, updateProduct } from "../../services/productService"
import AdminSidebar from "../../components/AdminSidebar"

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [size, setSize] = useState("")
  const [location, setLocation] = useState("")
  const [image, setImage] = useState("")
  const [desc, setDesc] = useState("")

  useEffect(() => {
    if (id) {
      getProduct(id).then((res) => {
        const p = res.data
        setName(p.name)
        setPrice(p.price)
        setSize(p.size)
        setLocation(p.location)
        setImage(p.image)
        setDesc(p.desc)
      })
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const product = { name, price, size, location, image, desc }

    if (id) {
      await updateProduct(id, product)
    } else {
      await addProduct(product)
    }
    navigate("/admin/products")
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h2>{id ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <input type="number" placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} required />
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
          <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
          <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
          <button type="submit">{id ? "Update" : "Create"}</button>
        </form>
      </div>
    </div>
  )
}
