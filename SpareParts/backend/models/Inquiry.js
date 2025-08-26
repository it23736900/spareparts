// backend/models/Inquiry.js
import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email:    { type: String, required: true },
    phone:    { type: String, required: true },
    vehicleBrand: { type: String, required: true },
    description:  { type: String, required: true },

    // existing long reference
    refCode: { type: String, unique: true, required: true },

    // NEW: optional short reference like "REF-4KPLTP"
    shortCode: { type: String, unique: true, sparse: true },

    status: {
      type: String,
      enum: ["Submitted","In Review","Quoted","Paid","Dispatched","Delivered","Cancelled","Closed"],
      default: "Submitted",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Inquiry", InquirySchema);
