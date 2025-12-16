import express from "express";
import {
  getCollections,
  getCollectionById,
  getCollectionBySlug,
  getAdminCollections,
  createCollection,
  updateCollection,
  deleteCollection,
} from "../controllers/collectionsController.js";

const router = express.Router();

// Public routes
router.get("/collection", getAdminCollections); // static route first
router.get("/", getCollections);
router.get("/admin/:id", getCollectionById);
router.get("/:slug", getCollectionBySlug); // dynamic route last

// Admin CRUD
router.post("/", createCollection);
router.put("/:id", updateCollection);
router.delete("/:id", deleteCollection);

export default router;
