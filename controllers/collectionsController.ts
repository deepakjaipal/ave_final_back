import { Request, Response } from "express";
import Collection from "../models/Collection.js";
import Product from "../models/productModel.js";

/**
 * @desc    Get all active collections
 * @route   GET /api/collections
 * @access  Public
 */
export const getAdminCollections = async (req: Request, res: Response) => {
  const collections = await Collection.find()
    .populate("products")
    .sort({ position: 1 });

  res.status(200).json(collections);
};
export const getCollections = async (req: Request, res: Response) => {
  try {
    const collections = await Collection.find({ isActive: true })
      .populate("products");

    res.status(200).json(collections);
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to fetch collections",
      error: error.message,
    });
  }
};
export const getCollectionById = async (req: Request, res: Response) => {
  const collection = await Collection.findById(req.params.id).populate("products");

  if (!collection) {
    return res.status(404).json({ message: "Collection not found" });
  }

  res.json(collection);
};
/**
 * @desc    Get collection by slug
 * @route   GET /api/collections/:slug
 * @access  Public
 */
export const getCollectionBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const collection = await Collection.findOne({
      slug,
      isActive: true,
    }).populate("products");

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.status(200).json(collection);
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to fetch collection",
      error: error.message,
    });
  }
};

/**
 * @desc    Create new collection
 * @route   POST /api/collections
 * @access  Admin
 */
export const createCollection = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, products } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ message: "Name and slug are required" });
    }

    const exists = await Collection.findOne({ slug });
    if (exists) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    const collection = await Collection.create({
      name,
      slug,
      description,
      products,
    });

    res.status(201).json(collection);
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to create collection",
      error: error.message,
    });
  }
};

/**
 * @desc    Update collection
 * @route   PUT /api/collections/:id
 * @access  Admin
 */

export const updateCollection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedCollection = await Collection.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedCollection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.status(200).json(updatedCollection);
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to update collection",
      error: error.message,
    });
  }
};

/**
 * @desc    Delete collection
 * @route   DELETE /api/collections/:id
 * @access  Admin
 */
export const deleteCollection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Collection.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to delete collection",
      error: error.message,
    });
  }
};
