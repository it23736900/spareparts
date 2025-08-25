// src/components/GetQuotationForm.jsx
import { useEffect, useState, useRef } from "react";
import api from "../utils/api"; // axios instance with baseURL "/api" + auth header (if present)

/* ===== Palette (luxury dark-green + metallic gold) ===== */
const GOLD = "#D4AF37";
const GOLD_SOFT = "rgba(212,175,55,0.65)";
const GOLD_BORDER = "rgba(212,175,55,0.45)";
const TEXT_SOFT = "#E6E6E0";

/* Metallic dark-green surfaces */
const METALLIC_GREEN = `
  linear-gradient(
    135deg,
    rgba(3,8,6,0.98) 0%,
    rgba(8,20,15,0.96) 45%,
    rgba(3,8,6,0.98) 100%
  )
`;
const METALLIC_GREEN_SOFT = `
  linear-gradient(
    135deg,
    rgba(5,14,11,0.92) 0%,
    rgba(10,26,20,0.90) 45%,
    rgba(5,14,11,0.92) 100%
  )
`;

const INPUT_BG = "rgba(10,26,20,0.92)";
const INPUT_BORDER = "rgba(35,72,58,0.65)";
const INPUT_BORDER_FOCUS = GOLD_SOFT;
const INPUT_RING = "0 0 0 4px rgba(212,175,55,0.12)";

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

// Helpers
const emailOK = (v = "") => /\S+@\S+\.\S+/.test(v.trim());
const phoneOK = (v = "") => v.replace(/\D/g, "").length >= 7; // simple, cross‑country safe

export default function GetQuotationForm({
  isOpen = false,
  onClose = () => {},
  prefill = {},
}) {
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
  const [inquiryId, setInquiryId] = useState(null);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const modalRef = useRef(null);
  const firstFieldRef = useRef(null);

  // Prefill brand when opened from a card
  useEffect(() => {
    if (isOpen && prefill.brand) {
      setForm((f) => ({ ...f, vehicleBrand: prefill.brand }));
    }
  }, [isOpen, prefill.brand]);

  // Focus first field on open
  useEffect(() => {
    if (isOpen && firstFieldRef.current) firstFieldRef.current.focus();
  }, [isOpen]);

  // Reset transient state when closing
  useEffect(() => {
    if (!isOpen) {
      setLoading(false);
      setError("");
      setCopied(false);
      setTimeout(() => {
        setSuccessCode(null);
        setInquiryId(null);
      }, 200);
    }
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => e.key === "Escape" && !loading && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose, loading]);

  const handleBackdropClick = (e) => {
    if (loading) return;
    if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Try to pull zod/our error format into a friendly text
  const formatError = (payload) => {
    if (!payload) return "Failed to submit inquiry";
    if (payload.message && typeof payload.message === "string") return payload.message;
    if (payload.errors && Array.isArray(payload.errors)) {
      try {
        const msgs = payload.errors
          .map((e) => (e?.path?.[0] ? `${e.path[0]}: ${e.message}` : e.message))
          .filter(Boolean);
        if (msgs.length) return msgs.join(" • ");
      } catch {}
    }
    return "Validation failed";
  };

  const validate = () => {
    if (!form.fullName.trim()) return "Full name is required";
    if (!emailOK(form.email)) return "Valid email is required";
    if (!phoneOK(form.phone)) return "Valid phone is required";
    if (!form.vehicleBrand) return "Vehicle brand is required";
    if (
      form.vehicleBrand === "Other (please specify)" &&
      !form.customBrand.trim()
    ) {
      return "Please specify your vehicle brand/model";
    }
    if (!form.description.trim() || form.description.trim().length < 5) {
      return "Please add a short description";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    const resolvedBrand =
      form.vehicleBrand === "Other (please specify)" && form.customBrand.trim()
        ? form.customBrand.trim()
        : form.vehicleBrand;

    setLoading(true);
    setError("");
    setCopied(false);
    setSubmittedEmail(form.email.trim());

    try {
      const { data } = await api.post("/inquiries", {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        vehicleBrand: resolvedBrand,
        description: form.description.trim(),
      });
      // Backend returns the created inquiry (with refCode)
      setSuccessCode(data?.refCode || "");
      setInquiryId(data?._id || null);

      // reset form
      setForm({
        fullName: "",
        email: "",
        phone: "",
        vehicleBrand: "",
        description: "",
        customBrand: "",
      });
    } catch (err) {
      const payload = err?.response?.data || { message: err.message };
      setError(formatError(payload));
    } finally {
      setLoading(false);
    }
  };

  const copyRef = async () => {
    if (!successCode) return;
    try {
      await navigator.clipboard.writeText(successCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const inputBase =
    "w-full p-4 rounded-lg text-base transition shadow-sm placeholder-gray-400 focus:outline-none";
  const textSoft = { color: TEXT_SOFT };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-center px-4 sm:px-6"
      onMouseDown={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop with gold-tinted vignette */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{
          background:
            "radial-gradient(60% 35% at 50% 0%, rgba(212,175,55,0.08), transparent 60%), rgba(0,0,0,0.72)",
        }}
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
        className="
          relative w-full max-w-lg sm:max-w-xl rounded-2xl p-5 sm:p-6 border
          shadow-[0_10px_60px_-10px_rgba(0,0,0,0.75)]
        "
        style={{
          background: METALLIC_GREEN,
          borderColor: GOLD_BORDER,
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.04) inset, 0 30px 80px rgba(0,0,0,0.55)",
        }}
      >
        {/* Top gold accent hairline */}
        <div
          className="absolute left-4 right-4 top-0 h-[2px] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.85), transparent)",
            transform: "translateY(-1px)",
          }}
        />

        {/* Close */}
        <button
          onClick={!loading ? onClose : undefined}
          className="absolute text-2xl leading-none text-white/80 hover:text-white disabled:opacity-50"
          aria-label="Close"
          type="button"
          disabled={loading}
          style={{ top: 12, right: 16 }}
        >
          ×
        </button>

        {/* Header */}
        <div className="mb-6 text-center sm:mb-8">
          <h2
            className="mb-2 text-2xl font-extrabold tracking-tight sm:text-3xl"
            style={{
              color: GOLD,
              textShadow: "0 0 16px rgba(212,175,55,0.25)",
              letterSpacing: "0.02em",
            }}
          >
            Parts Inquiry Form
          </h2>
          <p
            className="text-xs sm:text-sm"
            style={{ color: "rgba(230,230,224,0.78)" }}
          >
            Tell us about your vehicle and requirements
          </p>
        </div>

        {/* Body */}
        {successCode ? (
          <div
            className="flex flex-col items-center p-6 text-center rounded-xl sm:p-7"
            style={{
              background: METALLIC_GREEN_SOFT,
              border: `1px solid ${GOLD_BORDER}`,
              boxShadow:
                "inset 0 0 24px rgba(255,255,255,0.04), 0 16px 60px rgba(0,0,0,0.6)",
            }}
          >
            <div
              className="flex items-center justify-center w-16 h-16 mb-5 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(212,175,55,0.18), rgba(10,26,20,0.85))",
                border: `1px solid ${GOLD_BORDER}`,
                boxShadow: "0 0 22px rgba(212,175,55,0.28)",
              }}
            >
              <svg
                className="w-8 h-8"
                style={{ color: GOLD }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h3 className="mb-3 text-xl font-bold sm:text-2xl" style={textSoft}>
              Inquiry Submitted Successfully!
            </h3>
            <p
              className="mb-6 text-sm sm:text-base"
              style={{ color: "rgba(230,230,224,0.85)" }}
            >
              Thank you for reaching out. We’ll review and respond within 24 hours.
            </p>

            <div
              className="w-full max-w-sm p-4 mb-5 rounded-xl"
              style={{
                background: METALLIC_GREEN_SOFT,
                border: `1px solid ${GOLD_BORDER}`,
              }}
            >
              <div className="flex items-center justify-center mb-2">
                <svg
                  className="w-5 h-5 mr-2"
                  style={{ color: GOLD }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-semibold" style={{ color: GOLD }}>
                  Email Confirmation Sent
                </span>
              </div>
              <p className="text-xs" style={{ color: "rgba(230,230,224,0.8)" }}>
                A confirmation with your reference number was sent to{" "}
                <span className="font-semibold" style={{ color: GOLD }}>
                  {submittedEmail}
                </span>
                .
              </p>
            </div>

            <div
              className="w-full max-w-xs px-6 py-4 mt-1 mb-3 rounded-xl"
              style={{
                background: "rgba(6,16,12,0.92)",
                border: "1px solid rgba(27,77,67,0.5)",
              }}
            >
              <span className="block mb-1 text-sm font-semibold" style={{ color: GOLD }}>
                Your Reference Code:
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="text-xl font-bold tracking-wider" style={textSoft}>
                  {successCode}
                </span>
                <button
                  onClick={copyRef}
                  className="text-xs px-3 py-1 rounded-md border"
                  style={{ borderColor: GOLD_BORDER, color: GOLD }}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            <div
              className="p-4 mt-2 rounded-xl"
              style={{
                background: "rgba(10,26,20,0.75)",
                border: "1px solid rgba(27,77,67,0.4)",
              }}
            >
              <h4 className="mb-2 text-sm font-semibold" style={{ color: GOLD }}>
                What happens next?
              </h4>
              <ul
                className="space-y-1 text-xs text-left"
                style={{ color: "rgba(230,230,224,0.85)" }}
              >
                <li>• Our team reviews your inquiry</li>
                <li>• You’ll receive a detailed quotation</li>
                <li>• We’ll contact you for confirmation</li>
              </ul>
            </div>

            {/* Optional: quick track link */}
            {inquiryId && (
              <a
                href={`/track?ref=${encodeURIComponent(successCode)}`}
                className="mt-5 text-sm underline"
                style={{ color: GOLD }}
              >
                Track this inquiry
              </a>
            )}

            <button
              className="mt-6 px-5 py-3 rounded-lg text-sm font-semibold"
              style={{
                color: GOLD,
                background: METALLIC_GREEN,
                border: `1.5px solid ${GOLD_BORDER}`,
              }}
              onClick={() => {
                setSuccessCode(null);
                setInquiryId(null);
                setCopied(false);
              }}
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" noValidate>
            {/* Full Name */}
            <Field
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              inputRef={firstFieldRef}
            />

            {/* Email */}
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            {/* Phone */}
            <Field
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />

            {/* Vehicle Brand */}
            <div>
              <Label>Vehicle Brand</Label>
              <select
                id="vehicleBrand"
                name="vehicleBrand"
                className={inputBase}
                value={form.vehicleBrand}
                onChange={handleChange}
                style={{
                  ...textSoft,
                  background: INPUT_BG,
                  border: `1px solid ${INPUT_BORDER}`,
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
                  appearance: "none",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = INPUT_BORDER_FOCUS;
                  e.currentTarget.style.boxShadow = `${INPUT_RING}, inset 0 0 0 1px rgba(255,255,255,0.02)`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = INPUT_BORDER;
                  e.currentTarget.style.boxShadow =
                    "inset 0 0 0 1px rgba(255,255,255,0.02)";
                }}
              >
                <option value="" style={{ background: INPUT_BG, color: TEXT_SOFT }}>
                  Select Vehicle Brand
                </option>
                {vehicleOptions.map((brand, idx) => (
                  <option
                    key={idx}
                    value={brand}
                    style={{ background: INPUT_BG, color: TEXT_SOFT }}
                  >
                    {brand}
                  </option>
                ))}
              </select>

              {form.vehicleBrand === "Other (please specify)" && (
                <Field
                  className="mt-3"
                  name="customBrand"
                  placeholder="Enter your vehicle brand/model"
                  value={form.customBrand}
                  onChange={handleChange}
                />
              )}
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your inquiry"
                className={`${inputBase} min-h-[110px] resize-none`}
                value={form.description}
                onChange={handleChange}
                style={{
                  ...textSoft,
                  background: INPUT_BG,
                  border: `1px solid ${INPUT_BORDER}`,
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = INPUT_BORDER_FOCUS;
                  e.currentTarget.style.boxShadow = `${INPUT_RING}, inset 0 0 0 1px rgba(255,255,255,0.02)`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = INPUT_BORDER;
                  e.currentTarget.style.boxShadow =
                    "inset 0 0 0 1px rgba(255,255,255,0.02)";
                }}
              />
            </div>

            {/* Error */}
            {error && (
              <p
                className="p-4 text-center rounded-lg"
                style={{
                  color: "rgba(255,120,120,0.9)",
                  background: "rgba(60,10,10,0.25)",
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
              className="w-full py-4 text-lg font-bold transition transform rounded-lg focus:outline-none disabled:opacity-60"
              style={{
                color: GOLD,
                background: METALLIC_GREEN,
                border: `1.5px solid ${GOLD_BORDER}`,
                letterSpacing: "0.02em",
                boxShadow: loading
                  ? "0 0 26px 10px rgba(20,92,75,0.35), inset 0 0 28px rgba(212,175,55,0.18)"
                  : "0 12px 26px rgba(0,0,0,0.45), inset 0 0 18px rgba(212,175,55,0.14)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 14px 30px rgba(0,0,0,0.55), 0 0 24px rgba(212,175,55,0.28), inset 0 0 22px rgba(212,175,55,0.22)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 12px 26px rgba(0,0,0,0.45), inset 0 0 18px rgba(212,175,55,0.14)";
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center" style={{ color: GOLD }}>
                  <svg
                    className="w-5 h-5 mr-2 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke={GOLD}
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill={GOLD}
                      d="M4 12a8 8 0 018-8v8z"
                    />
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
    </div>
  );
}

/* ---------- tiny local UI atoms to reduce repetition ---------- */
function Label({ children }) {
  return (
    <label
      className="block mb-2 text-sm font-semibold"
      style={{ color: GOLD }}
    >
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  inputRef,
  className = "",
}) {
  const base =
    "w-full p-4 rounded-lg text-base transition shadow-sm placeholder-gray-400 focus:outline-none";
  return (
    <div className={className}>
      {label && <Label>{label}</Label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        ref={inputRef}
        className={base}
        style={{
          color: TEXT_SOFT,
          background: INPUT_BG,
          border: `1px solid ${INPUT_BORDER}`,
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = INPUT_BORDER_FOCUS;
          e.currentTarget.style.boxShadow = `${INPUT_RING}, inset 0 0 0 1px rgba(255,255,255,0.02)`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = INPUT_BORDER;
          e.currentTarget.style.boxShadow =
            "inset 0 0 0 1px rgba(255,255,255,0.02)";
        }}
      />
    </div>
  );
}
