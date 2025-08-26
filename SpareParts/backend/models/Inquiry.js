// models/Inquiry.js
import mongoose from "mongoose";
const InquirySchema = new mongoose.Schema({
  ref: { type: String, required: true, unique: true },
  customerName: String,
  customerEmail: String,
  brand: String,
  item: String,
  status: { type: String, enum: ["Submitted","In Review","Quoted","Paid","Dispatched","Delivered"], default: "Submitted" },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });
export default mongoose.model("Inquiry", InquirySchema);
