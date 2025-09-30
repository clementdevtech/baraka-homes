import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "../../api"

export default function AdminBlogForm() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [coverImage, setCoverImage] = useState(null)
  const [images, setImages] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("content", content)
    if (coverImage) formData.append("coverImage", coverImage)
    images.forEach((img) => formData.append("images", img))

    try {
      if (slug) {
        await API.put(`/api/blogs/${slug}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      } else {
        await API.post(`/api/blogs`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      }
      navigate("/admin/blogs")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h2>{slug ? "Edit Blog" : "New Blog"}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cover Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Extra Images</label>
          <input
            type="file"
            className="form-control"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
          />
        </div>

        <button className="btn btn-primary">{slug ? "Update" : "Create"}</button>
      </form>
    </div>
  )
}