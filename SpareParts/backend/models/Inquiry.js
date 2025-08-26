// backend/models/Inquiry.js
import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    vehicleBrand: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Submitted", "In Review", "Quoted", "Paid", "Dispatched", "Delivered"],
      default: "Submitted",
    },
    refCode: { type: String, unique: true, required: true, index: true },
  },
  { timestamps: true }
);

export default mongoose.model("Inquiry", InquirySchema);
