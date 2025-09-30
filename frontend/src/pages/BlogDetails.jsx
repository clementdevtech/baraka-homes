import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getBlog, addComment, toggleReaction, deleteBlog } from "../services/blogService"
import { useAuth } from "../context/AuthContext"

export default function BlogDetails() {
  const { slug } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [blog, setBlog] = useState(null)
  const [comment, setComment] = useState("")

  const fetchBlog = async () => {
    const res = await getBlog(slug)
    setBlog(res.data)
  }

  useEffect(() => {
    fetchBlog()
  }, [slug])

  const handleComment = async () => {
    if (!user) {
      alert("You must be logged in to comment")
      return
    }
    await addComment(slug, comment)
    setComment("")
    fetchBlog()
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await deleteBlog(slug)
      navigate("/blog")
    }
  }

  if (!blog) return <p>Loading...</p>

  return (
    <div>
      <h1>{blog.title}</h1>
      {blog.coverImage && (
        <img src={`data:image/jpeg;base64,${blog.coverImage}`} alt={blog.title} />
      )}
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />

      {/* Reactions (only logged-in users can react) */}
      {user ? (
        <div>
          <button onClick={() => toggleReaction(slug, "like")}>
            👍 {blog.reactions?.like?.length || 0}
          </button>
          <button onClick={() => toggleReaction(slug, "love")}>
            ❤️ {blog.reactions?.love?.length || 0}
          </button>
        </div>
      ) : (
        <p><i>Login to react</i></p>
      )}

      {/* Admin-only controls */}
      {user?.role === "admin" && (
        <div>
          <button onClick={() => navigate(`/admin/blogs/edit/${slug}`)}>✏️ Edit</button>
          <button onClick={handleDelete}>🗑️ Delete</button>
        </div>
      )}

      {/* Comments */}
      <h3>Comments</h3>
      {blog.comments?.map((c) => (
        <div key={c._id}>
          <b>{c.user?.username}</b>: {c.text}
        </div>
      ))}

      {user ? (
        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleComment}>Add Comment</button>
        </div>
      ) : (
        <p><i>Login to comment</i></p>
      )}
    </div>
  )
}
