import HomeSection from '../models/HomeSection.js';
/* ===============================
   GET PUBLIC HOME SECTIONS
   =============================== */
export const getPublicHomeSections = async (_req, res) => {
    try {
        const sections = await HomeSection.find({ enabled: true })
            .sort({ order: 1 })
            .populate('products', 'title price salePrice image')
            .lean();
        res.status(200).json(sections);
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch home sections',
            error: error.message,
        });
    }
};
/* ===============================
   GET ALL (ADMIN)
   =============================== */
export const getAllHomeSections = async (_req, res) => {
    try {
        const sections = await HomeSection.find()
            .sort({ order: 1 })
            .lean();
        res.status(200).json(sections);
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch home sections',
            error: error.message,
        });
    }
};
/* ===============================
   CREATE HOME SECTION
   =============================== */
export const createHomeSection = async (req, res) => {
    try {
        const { type, title, subtitle = '', order, enabled = true, deals = [], products = [], endTime, settings = {}, } = req.body;
        if (!type || !title) {
            return res.status(400).json({ message: 'Type and title are required' });
        }
        if (order === undefined) {
            return res.status(400).json({ message: 'Order is required' });
        }
        if (type === 'flash_deals' && deals.length === 0) {
            return res
                .status(400)
                .json({ message: 'Flash deals must contain deal items' });
        }
        if (type === 'product_carousel' && products.length === 0) {
            return res
                .status(400)
                .json({ message: 'Product carousel must contain products' });
        }
        const section = await HomeSection.create({
            type,
            title,
            subtitle,
            order,
            enabled,
            deals,
            products,
            endTime,
            settings,
        });
        res.status(201).json(section);
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to create home section',
            error: error.message,
        });
    }
};
/* ===============================
   UPDATE HOME SECTION
   =============================== */
export const updateHomeSection = async (req, res) => {
    try {
        const { id } = req.params;
        const section = await HomeSection.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!section) {
            return res.status(404).json({ message: 'Home section not found' });
        }
        res.status(200).json(section);
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to update home section',
            error: error.message,
        });
    }
};
/* ===============================
   DELETE HOME SECTION
   =============================== */
export const deleteHomeSection = async (req, res) => {
    try {
        const { id } = req.params;
        const section = await HomeSection.findByIdAndDelete(id);
        if (!section) {
            return res.status(404).json({ message: 'Home section not found' });
        }
        res.status(200).json({ message: 'Home section deleted successfully' });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to delete home section',
            error: error.message,
        });
    }
};
