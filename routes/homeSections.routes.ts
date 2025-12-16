import { Router } from 'express';
import {
  getPublicHomeSections,
  getAllHomeSections,
  createHomeSection,
  updateHomeSection,
  deleteHomeSection,
} from '../controllers/homeSectionsController.js';

const router = Router();

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
