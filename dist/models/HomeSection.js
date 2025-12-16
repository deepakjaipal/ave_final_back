import mongoose from 'mongoose';
const FlashDealSchema = new mongoose.Schema({
    title: { type: String, required: true },
    discount: { type: String, required: true }, // "40%"
    image: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    category: { type: String },
}, { _id: false });
const HomeSectionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['flash_deals', 'product_carousel'],
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    subtitle: {
        type: String,
        default: '',
    },
    enabled: {
        type: Boolean,
        default: true,
    },
    order: {
        type: Number,
        required: true,
    },
    deals: {
        type: [FlashDealSchema],
        default: [],
    },
    endTime: {
        type: Date,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    settings: {
        itemsPerView: {
            type: Number,
            default: 4,
        },
        autoplay: {
            type: Boolean,
            default: false,
        },
        loop: {
            type: Boolean,
            default: true,
        },
    },
}, { timestamps: true });
HomeSectionSchema.pre('save', function (next) {
    if (this.type === 'flash_deals') {
        if (!this.deals || this.deals.length === 0) {
            return next(new Error('Flash deals must have at least one deal item'));
        }
    }
    if (this.type === 'product_carousel') {
        if (!this.products || this.products.length === 0) {
            return next(new Error('Product carousel must have products'));
        }
    }
    next();
});
export default mongoose.model('HomeSection', HomeSectionSchema);
