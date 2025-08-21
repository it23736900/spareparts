import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    vehicleBrand: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    refCode: { type: String, unique: true, index: true },
  },
  { timestamps: true }
);

// Auto-generate REF-XXXXXX once on create
InquirySchema.pre("save", function (next) {
  if (!this.refCode) {
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.refCode = `REF-${rand}`;
  }
  next();
});

// ✅ DEFAULT export
const Inquiry = mongoose.model("Inquiry", InquirySchema);
export default Inquiry;
