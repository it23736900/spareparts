import { useState } from "react";

// Palette
const GOLD = "#D4AF37";          // soft luxury gold
const GOLD_BORDER = "rgba(212,175,55,0.55)";
const EMERALD_900 = "#0B1C1F";    // deep background
const EMERALD_800 = "#0E2A24";
const EMERALD_700 = "#102A27";    // input bg
const EMERALD_GRAD_1 = "#0D3D34"; // button gradient start
const EMERALD_GRAD_2 = "#145C4B"; // button gradient end
const TEXT_SOFT = "#E6E6E0";      // warm light text (not pure white)

const vehicleOptions = [
  "Range Rover",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Volvo",
  "Volkswagen",
  "Porsche",
  "MG",
  "Ford",
  "Jaguar",
  "Renault",
  "Peugeot",
  "Mini Cooper",
  "Other (please specify)",
];

export default function GetQuotationForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    vehicleBrand: "",
    description: "",
    customBrand: "",
  });

  const [loading, setLoading] = useState(false);
  const [successCode, setSuccessCode] = useState(null);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const required = ["fullName", "email", "phone", "vehicleBrand", "description"];
    let isEmpty = required.some((f) => !form[f].trim());
    if (form.vehicleBrand === "Other (please specify)" && !form.customBrand.trim()) {
      isEmpty = true;
    }
    if (isEmpty) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");
    setSubmittedEmail(form.email);

    setTimeout(() => {
      const mockRef = "REF-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      setSuccessCode(mockRef);
      setForm({
        fullName: "",
        email: "",
        phone: "",
        vehicleBrand: "",
        description: "",
        customBrand: "",
      });
      setLoading(false);
    }, 1000);
  };

  const inputBase =
    "w-full p-4 rounded-xl text-base transition backdrop-blur-sm " +
    "border focus:outline-none " +
    "placeholder-gray-400";
  const inputTheme =
    "bg-[#102A27] border-[#2A4F47] " +
    "focus:ring-2 focus:ring-[rgba(212,175,55,0.55)] focus:border-[rgba(212,175,55,0.65)]";
  const textSoft = { color: TEXT_SOFT };

  return (
    <div className="max-w-lg mx-auto p-0 font-sans">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight mb-2" style={{ color: GOLD }}>
          Parts Inquiry Form
        </h2>
        <p className="text-sm" style={{ color: "rgba(230,230,224,0.75)" }}>
          Tell us about your vehicle and requirements
        </p>
      </div>

      {successCode ? (
        <div
          className="rounded-2xl p-8 text-center flex flex-col items-center backdrop-blur-sm shadow-[0_12px_40px_-20px_rgba(0,0,0,0.8)]"
          style={{ backgroundColor: `${EMERALD_800}B3`, border: `1px solid rgba(27,77,67,0.4)` }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
            style={{
              backgroundColor: "rgba(212,175,55,0.12)",
              border: `1px solid ${GOLD_BORDER}`,
            }}
          >
            <svg className="w-8 h-8" style={{ color: GOLD }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h3 className="text-2xl font-bold mb-3" style={textSoft}>
            Inquiry Submitted Successfully!
          </h3>
          <p className="text-base mb-6" style={{ color: "rgba(230,230,224,0.8)" }}>
            Thank you for reaching out to us. Your inquiry has been received and we'll get back to you within 24 hours.
          </p>

          {/* Email Confirmation */}
          <div
            className="rounded-xl p-4 mb-5 w-full max-w-sm"
            style={{ backgroundColor: `${EMERALD_900}B3`, border: `1px solid ${GOLD_BORDER}` }}
          >
            <div className="flex items-center justify-center mb-2">
              <svg className="w-5 h-5 mr-2" style={{ color: GOLD }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-semibold text-sm" style={{ color: GOLD }}>
                Email Confirmation Sent
              </span>
            </div>
            <p className="text-xs" style={{ color: "rgba(230,230,224,0.75)" }}>
              A confirmation email with your reference number has been sent to{" "}
              <span className="font-semibold" style={{ color: GOLD }}>
                {submittedEmail}
              </span>
              .
            </p>
          </div>

          <div
            className="rounded-xl px-6 py-4 mt-1 mb-4 w-full max-w-xs"
            style={{ backgroundColor: `${EMERALD_900}B3`, border: "1px solid rgba(27,77,67,0.5)" }}
          >
            <span className="block font-semibold text-sm mb-1" style={{ color: GOLD }}>
              Your Reference Code:
            </span>
            <span className="font-bold text-xl tracking-wider" style={textSoft}>
              {successCode}
            </span>
          </div>

          {/* Next Steps */}
          <div
            className="mt-2 p-4 rounded-xl"
            style={{ backgroundColor: `${EMERALD_800}80`, border: "1px solid rgba(27,77,67,0.4)" }}
          >
            <h4 className="font-semibold text-sm mb-2" style={{ color: GOLD }}>
              What happens next?
            </h4>
            <ul className="text-xs space-y-1 text-left" style={{ color: "rgba(230,230,224,0.8)" }}>
              <li>• Our team will review your inquiry within 24 hours</li>
              <li>• You'll receive a detailed quote via email</li>
              <li>• We'll contact you to discuss further details</li>
            </ul>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold mb-2" style={{ color: GOLD }}>
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              className={`${inputBase} ${inputTheme}`}
              value={form.fullName}
              onChange={handleChange}
              style={textSoft}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: GOLD }}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className={`${inputBase} ${inputTheme}`}
              value={form.email}
              onChange={handleChange}
              style={textSoft}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold mb-2" style={{ color: GOLD }}>
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className={`${inputBase} ${inputTheme}`}
              value={form.phone}
              onChange={handleChange}
              style={textSoft}
            />
          </div>

          {/* Vehicle Brand */}
          <div>
            <label htmlFor="vehicleBrand" className="block text-sm font-semibold mb-2" style={{ color: GOLD }}>
              Vehicle Brand
            </label>
            <select
              id="vehicleBrand"
              name="vehicleBrand"
              className={`${inputBase} ${inputTheme}`}
              value={form.vehicleBrand}
              onChange={handleChange}
              style={textSoft}
            >
              <option value="" className="bg-[#102A27]" style={textSoft}>
                Select Vehicle Brand
              </option>
              {vehicleOptions.map((brand, idx) => (
                <option key={idx} value={brand} className="bg-[#102A27]" style={textSoft}>
                  {brand}
                </option>
              ))}
            </select>

            {form.vehicleBrand === "Other (please specify)" && (
              <input
                type="text"
                name="customBrand"
                placeholder="Enter your vehicle brand/model"
                className={`mt-3 ${inputBase} ${inputTheme}`}
                value={form.customBrand}
                onChange={handleChange}
                style={textSoft}
              />
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold mb-2" style={{ color: GOLD }}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your inquiry"
              className={`${inputBase} ${inputTheme} min-h-[100px] resize-none`}
              value={form.description}
              onChange={handleChange}
              style={textSoft}
            />
          </div>

          {/* Error */}
          {error && (
            <p
              className="rounded-xl p-4 text-center backdrop-blur-sm"
              style={{
                color: "rgba(255,120,120,0.9)",
                backgroundColor: "rgba(60,10,10,0.25)",
                border: "1px solid rgba(255,120,120,0.35)",
              }}
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-lg transition 
                        focus:outline-none focus:ring-2 
                        ${loading ? "shadow-[0_0_26px_10px_rgba(20,92,75,0.35)]" : "hover:shadow-[0_0_30px_10px_rgba(20,92,75,0.35)]"}`}
            style={{
              color: GOLD,
              backgroundImage: `linear-gradient(90deg, ${EMERALD_GRAD_1}, ${EMERALD_GRAD_2})`,
              boxShadow: loading ? "0 0 26px 10px rgba(20,92,75,0.35)" : undefined,
              border: `1px solid rgba(27,77,67,0.45)`,
              letterSpacing: "0.02em",
              // ring (focus)
              // Tailwind ring class is included above; inline for consistency:
              // none here; we keep class
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center" style={{ color: GOLD }}>
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke={GOLD} strokeWidth="4"></circle>
                  <path className="opacity-75" fill={GOLD} d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Inquire Now"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
