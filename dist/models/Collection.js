import mongoose from "mongoose";
const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    products: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
    ],
    isActive: { type: Boolean, default: true },
    position: { type: Number, default: 0 },
    bannerImage: String,
}, { timestamps: true });
export default mongoose.model("Collection", collectionSchema);
