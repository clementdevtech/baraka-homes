import Blog from "../models/Blog.js";

// Utility: buffer → base64 string
const bufferToBase64 = (buffer, mimetype) =>
  `data:${mimetype};base64,${buffer.toString("base64")}`;

// ------------------ Get Blogs ------------------
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username email");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug })
      .populate("author", "username")
      .populate("comments.user", "username")
      .populate("comments.replies.user", "username");

    if (!blog) return res.status(404).json({ error: "Blog not found" });

    const userId = req.user ? req.user._id.toString() : null;

    // Counts
    const reactions = {
      likes: blog.reactions.likes.length,
      hearts: blog.reactions.hearts.length,
      dislikes: blog.reactions.dislikes.length,
    };

    // User's current reaction
    const userReactions = {
      like: userId
        ? blog.reactions.likes.some(id => id.toString() === userId)
        : false,
      heart: userId
        ? blog.reactions.hearts.some(id => id.toString() === userId)
        : false,
      dislike: userId
        ? blog.reactions.dislikes.some(id => id.toString() === userId)
        : false,
    };

    res.json({
      ...blog.toObject(),
      reactions,
      userReactions,
    });
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ------------------ Add Blog ------------------
export const addBlog = async (req, res) => {
  try {
    const { title, slug, content, tags } = req.body;

    let coverImage = null;
    let images = [];

    if (req.files?.coverImage?.[0]) {
      coverImage = bufferToBase64(
        req.files.coverImage[0].buffer,
        req.files.coverImage[0].mimetype
      );
    }

    if (req.files?.images) {
      images = req.files.images.map((file) =>
        bufferToBase64(file.buffer, file.mimetype)
      );
    }

    const blog = new Blog({
      title,
      slug,
      content,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      coverImage,
      images,
      author: req.user._id,
    });

    await blog.save();

    // Build reaction counts + userReactions (initially empty)
    const reactions = {
      likes: 0,
      hearts: 0,
      dislikes: 0,
    };

    const userReactions = {
      like: false,
      heart: false,
      dislike: false,
    };

    res.status(201).json({
      ...blog.toObject(),
      reactions,
      userReactions,
    });
  } catch (err) {
    console.error("Error adding blog:", err);
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
};

// ------------------ Update Blog (replace images) ------------------
export const updateBlog = async (req, res) => {
  try {
    const { title, content, tags, published } = req.body;
    const slug = req.params.slug;

    const blog = await Blog.findOne({ slug });
    if (!blog) return res.status(404).json({ message: "Not found" });

    // Update text fields
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (tags) blog.tags = tags.split(",").map((t) => t.trim());
    if (typeof published !== "undefined") blog.published = published;

    // ✅ Replace cover image if provided
    if (req.files?.coverImage?.[0]) {
      blog.coverImage = bufferToBase64(
        req.files.coverImage[0].buffer,
        req.files.coverImage[0].mimetype
      );
    }

    // ✅ Replace entire images array if new ones are uploaded
    if (req.files?.images && req.files.images.length > 0) {
      blog.images = req.files.images.map((file) =>
        bufferToBase64(file.buffer, file.mimetype)
      );
    }

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};


// ------------------ Delete Blog ------------------
export const deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findOneAndDelete({ slug: req.params.slug });
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ Comments ------------------
export const addComment = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Not found" });

    blog.comments.push({ user: req.user._id, text: req.body.text });
    await blog.save();

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addReply = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Not found" });

    const comment = blog.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.replies.push({ user: req.user._id, text: req.body.text });
    await blog.save();

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ Reactions ------------------
export const toggleReaction = async (req, res) => {
  const { slug } = req.params;
  const { type } = req.body; // "like" | "heart" | "dislike"
  const userId = req.user._id;

  const blog = await Blog.findOne({ slug });
  if (!blog) return res.status(404).json({ error: "Blog not found" });

  // Remove user from all reaction arrays first
  blog.reactions.likes = blog.reactions.likes.filter(id => id.toString() !== userId.toString());
  blog.reactions.hearts = blog.reactions.hearts.filter(id => id.toString() !== userId.toString());
  blog.reactions.dislikes = blog.reactions.dislikes.filter(id => id.toString() !== userId.toString());

  // Add to the selected type
  if (type === "like") blog.reactions.likes.push(userId);
  if (type === "heart") blog.reactions.hearts.push(userId);
  if (type === "dislike") blog.reactions.dislikes.push(userId);

  await blog.save();

  res.json({
    reactions: {
      likes: blog.reactions.likes.length,
      hearts: blog.reactions.hearts.length,
      dislikes: blog.reactions.dislikes.length,
    },
    userReactions: {
      like: blog.reactions.likes.some(id => id.toString() === userId.toString()),
      heart: blog.reactions.hearts.some(id => id.toString() === userId.toString()),
      dislike: blog.reactions.dislikes.some(id => id.toString() === userId.toString()),
    },
  });
};