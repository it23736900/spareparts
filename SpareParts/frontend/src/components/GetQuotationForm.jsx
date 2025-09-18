// src/components/GetQuotationForm.jsx
import { useEffect, useState, useRef } from "react";
import api from "../utils/api"; // axios instance with baseURL "/api"

/* ---------- Colors ---------- */
const GOLD = "#D4AF37";
const GOLD_SOFT = "rgba(212,175,55,0.65)";
const GOLD_BORDER = "rgba(212,175,55,0.45)";
const TEXT_SOFT = "#E6E6E0";

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

/* ---------- Helpers ---------- */
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

const emailOK = (v = "") => /\S+@\S+\.\S+/.test(v.trim());
const phoneOK = (v = "") => v.replace(/\D/g, "").length >= 7;

/* ---------- Component ---------- */
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
    item: "",
    description: "",
    customBrand: "",
  });

  const [loading, setLoading] = useState(false);
  const [successCode, setSuccessCode] = useState(null);
  const [inquiryId, setInquiryId] = useState(null);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const modalRef = useRef(null);
  const firstFieldRef = useRef(null);

  /* ---------- Prefill ---------- */
  useEffect(() => {
    if (isOpen && prefill.brand) {
      setForm((f) => ({ ...f, vehicleBrand: prefill.brand }));
    }
  }, [isOpen, prefill.brand]);

  /* ---------- Focus ---------- */
  useEffect(() => {
    if (isOpen && firstFieldRef.current) firstFieldRef.current.focus();
  }, [isOpen]);

  /* ---------- Reset ---------- */
  useEffect(() => {
    if (!isOpen) {
      setLoading(false);
      setError("");
      setCopied(false);
      setTimeout(() => {
        setSuccessCode(null);
        setInquiryId(null);
        setEmailSent(false);
      }, 200);
    }
  }, [isOpen]);

  /* ---------- ESC key ---------- */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => e.key === "Escape" && !loading && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose, loading]);

  /* ---------- Scroll lock ---------- */
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (loading) return;
    if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const formatError = (payload) => {
    if (!payload) return "Failed to submit inquiry";
    if (payload.message && typeof payload.message === "string") return payload.message;
    return "Validation failed";
  };

  const validate = () => {
    if (!form.fullName.trim()) return "Full name is required";
    if (!emailOK(form.email)) return "Valid email is required";
    if (!phoneOK(form.phone)) return "Valid phone is required";
    if (!form.vehicleBrand) return "Vehicle brand is required";
    if (form.vehicleBrand === "Other (please specify)" && !form.customBrand.trim()) {
      return "Please specify your vehicle brand/model";
    }
    if (!form.item.trim()) return "Part / Item is required";
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
        name: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        brand: resolvedBrand,
        item: form.item.trim(),
        description: form.description.trim(),
      });

      const ref = data?.ref || data?.refCode || "";
      setSuccessCode(ref);
      setInquiryId(data?._id || null);
      setEmailSent(Boolean(data?.emailSent));

      setForm({
        fullName: "",
        email: "",
        phone: "",
        vehicleBrand: "",
        item: "",
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-center px-3 sm:px-6"
      onMouseDown={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{
          background:
            "radial-gradient(60% 35% at 50% 0%, rgba(212,175,55,0.08), transparent 60%), rgba(0,0,0,0.72)",
        }}
      />

      <div
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
        className="
          relative w-full max-w-md sm:max-w-xl md:max-w-2xl
          max-h-[90vh] overflow-y-auto
          rounded-2xl p-4 sm:p-6 border
          shadow-[0_10px_60px_-10px_rgba(0,0,0,0.75)]
        "
        style={{
          background: METALLIC_GREEN,
          borderColor: GOLD_BORDER,
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.04) inset, 0 30px 80px rgba(0,0,0,0.55)",
        }}
      >
        {/* Close button */}
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

        {/* Heading */}
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

        {/* Success or Form */}
        {successCode ? (
          <div
            className="flex flex-col items-center p-5 sm:p-7 text-center rounded-xl"
            style={{
              background: METALLIC_GREEN_SOFT,
              border: `1px solid ${GOLD_BORDER}`,
              boxShadow:
                "inset 0 0 24px rgba(255,255,255,0.04), 0 16px 60px rgba(0,0,0,0.6)",
            }}
          >
            <h3 className="mb-2 text-xl font-bold sm:text-2xl" style={{ color: TEXT_SOFT }}>
              Inquiry Submitted Successfully!
            </h3>

            {emailSent ? (
              <p className="mb-4 text-sm sm:text-base" aria-live="polite" style={{ color: "rgba(230,230,224,0.85)" }}>
                Email confirmation sent to{" "}
                <span className="font-semibold" style={{ color: GOLD }}>
                  {submittedEmail}
                </span>
              </p>
            ) : (
              <p className="mb-4 text-sm sm:text-base" aria-live="polite" style={{ color: "rgba(230,230,224,0.85)" }}>
                We’ve received your request. Keep your reference code safe.
              </p>
            )}

            <div
              className="w-full max-w-xs px-6 py-4 mt-1 mb-3 rounded-xl"
              style={{ background: "rgba(6,16,12,0.92)", border: "1px solid rgba(27,77,67,0.5)" }}
            >
              <span className="block mb-1 text-sm font-semibold" style={{ color: GOLD }}>
                Your Reference Code:
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="text-xl font-bold tracking-wider" style={{ color: TEXT_SOFT }}>
                  {successCode}
                </span>
                <button onClick={copyRef} className="text-xs px-3 py-1 rounded-md border" style={{ borderColor: GOLD_BORDER, color: GOLD }}>
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {inquiryId && (
              <a href={`/track?ref=${encodeURIComponent(successCode)}`} className="mt-5 text-sm underline" style={{ color: GOLD }}>
                Track this inquiry
              </a>
            )}

            <button
              className="mt-6 px-5 py-3 rounded-lg text-sm font-semibold"
              style={{ color: GOLD, background: METALLIC_GREEN, border: `1.5px solid ${GOLD_BORDER}` }}
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
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              <Field label="Full Name" name="fullName" value={form.fullName}
                onChange={handleChange} placeholder="Enter your full name"
                inputRef={firstFieldRef} autoComplete="name" />
              <Field label="Email" name="email" type="email" value={form.email}
                onChange={handleChange} placeholder="Enter your email"
                autoComplete="email" />
            </div>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              <Field label="Phone" name="phone" value={form.phone}
                onChange={handleChange} placeholder="Enter your phone number"
                type="tel" inputMode="tel" autoComplete="tel" />

              <div>
                <Label htmlFor="vehicleBrand">Vehicle Brand</Label>
                <select
                  id="vehicleBrand"
                  name="vehicleBrand"
                  className="w-full p-4 rounded-lg text-base"
                  value={form.vehicleBrand}
                  onChange={handleChange}
                  style={{
                    color: TEXT_SOFT,
                    background: INPUT_BG,
                    border: `1px solid ${INPUT_BORDER}`,
                  }}
                >
                  <option value="">Select Vehicle Brand</option>
                  {vehicleOptions.map((brand, idx) => (
                    <option key={idx} value={brand}>{brand}</option>
                  ))}
                </select>

                {form.vehicleBrand === "Other (please specify)" && (
                  <Field className="mt-3" name="customBrand"
                    placeholder="Enter your vehicle brand/model"
                    value={form.customBrand} onChange={handleChange} />
                )}
              </div>
            </div>

            <Field label="Part / Item" name="item" value={form.item}
              onChange={handleChange} placeholder="e.g., Front Grille, ECU, ABS Sensor" />

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your inquiry"
                className="w-full p-4 rounded-lg text-base min-h-[110px] resize-y"
                value={form.description}
                onChange={handleChange}
                style={{
                  color: TEXT_SOFT,
                  background: INPUT_BG,
                  border: `1px solid ${INPUT_BORDER}`,
                }}
              />
            </div>

            {error && (
              <p className="p-4 text-center rounded-lg"
                style={{
                  color: "rgba(255,120,120,0.9)",
                  background: "rgba(60,10,10,0.25)",
                  border: "1px solid rgba(255,120,120,0.35)",
                }}
                aria-live="polite">
                {error}
              </p>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => !loading && onClose()}
                className="w-full min-h-[44px] rounded-lg font-semibold border"
                style={{ color: TEXT_SOFT, borderColor: GOLD_BORDER, background: "rgba(6,16,12,0.75)" }}>
                Cancel
              </button>
              <button type="submit" disabled={loading}
                className="w-full min-h-[44px] rounded-lg text-lg font-bold focus:outline-none disabled:opacity-60"
                style={{ color: GOLD, background: METALLIC_GREEN, border: `1.5px solid ${GOLD_BORDER}` }}>
                {loading ? "Submitting..." : "Inquire Now"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ---------- Atoms ---------- */
function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block mb-2 text-sm font-semibold" style={{ color: GOLD }}>
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
  autoComplete,
  inputMode,
}) {
  const id = name;
  return (
    <div className={className}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        ref={inputRef}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="w-full p-4 rounded-lg text-base"
        style={{
          color: TEXT_SOFT,
          background: INPUT_BG,
          border: `1px solid ${INPUT_BORDER}`,
        }}
      />
    </div>
  );
}
