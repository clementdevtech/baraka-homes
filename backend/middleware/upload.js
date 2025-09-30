import multer from "multer";

// Store files in memory (not disk)
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
