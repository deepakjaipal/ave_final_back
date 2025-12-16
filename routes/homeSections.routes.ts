import express from "express";
import {
  getPublicHomeSections,
  getAllHomeSections,
  createHomeSection,
  updateHomeSection,
  deleteHomeSection,
} from '../controllers/homeSectionsController.js';

const router = express.Router();  // ✅ Changed from Router() to express.Router()

/* ===============================
   PUBLIC (Frontend)
   =============================== */
router.get('/public', getPublicHomeSections);

/* ===============================
   ADMIN (CMS)
   =============================== */
router.get('/', getAllHomeSections);
router.post('/', createHomeSection);
router.put('/:id', updateHomeSection);
router.delete('/:id', deleteHomeSection);

export default router;