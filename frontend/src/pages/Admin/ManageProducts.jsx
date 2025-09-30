import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../../api"

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([])

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/api/blogs")
      setBlogs(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return
    try {
      await API.delete(`/api/blogs/${id}`)
      setBlogs(blogs.filter((b) => b._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h2>Manage Blogs</h2>
      <Link to="/admin/blogs/new" className="btn btn-primary mb-3">
        + New Blog
      </Link>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((b) => (
            <tr key={b._id}>
              <td>{b.title}</td>
              <td>{b.slug}</td>
              <td>
                <Link
                  to={`/admin/blogs/edit/${b.slug}`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(b._id)}
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
