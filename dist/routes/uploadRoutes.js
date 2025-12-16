import express from "express";
import multer from "multer";
import { uploadToCloudinary } from "../config/cloudinary.js";
const router = express.Router();
// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Upload image to Cloudinary
router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }
        if (!req.body.title) {
            return res.status(400).json({ message: "Title and image are required" });
        }
        const uploadResult = await uploadToCloudinary(req.file.buffer, {
            folder: "ave-catering/categories",
            public_id: `category_${Date.now()}`,
            resource_type: "auto",
            transformation: [
                { width: 400, height: 300, crop: "limit" },
                { quality: "auto" },
                { format: "auto" },
            ],
        });
        res.json({
            secure_url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
            title: req.body.title,
        });
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "Image upload failed", stack: null });
    }
});
export default router;
