// src/components/GetQuotationForm.jsx
import { useEffect, useState, useRef } from "react";
import api from "../utils/api"; // axios instance with baseURL "/api"



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
    if (payload.message && typeof payload.message === "string")
      return payload.message;
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
    >
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{
          background:
            "radial-gradient(60% 35% at 50% 0%, rgba(0,255,179,0.08), transparent 60%), rgba(0,0,0,0.75)",
        }}
      />

      <div
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
        className="relative w-full max-w-md sm:max-w-xl md:max-w-2xl
                   h-[90vh] overflow-y-auto rounded-2xl
                   bg-[#051111]/95 border border-[#00ffb3]/30
                   backdrop-blur-xl p-6 sm:p-8 md:p-10
                   shadow-[0_0_25px_rgba(0,255,179,0.08),inset_0_0_12px_rgba(255,255,255,0.03)]"
      >
        {/* Close button */}
        <button
          onClick={!loading ? onClose : undefined}
          className="absolute z-50 text-emerald-400 hover:text-emerald-300
                     transition-transform transform hover:scale-110
                     bg-black/40 rounded-full w-8 h-8 flex items-center justify-center"
          style={{
            top: "calc(env(safe-area-inset-top, 0px) + 0.75rem)",
            right: "1rem",
          }}
        >
          ×
        </button>

        {/* Heading */}
        <div className="mb-6 text-center sm:mb-8">
          <h2 className="mb-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Parts Inquiry Form
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Tell us about your vehicle and requirements
          </p>
        </div>

        {/* Success or Form */}
        {successCode ? (
          <div className="flex flex-col items-center p-5 sm:p-7 text-center rounded-xl border border-[#00ffb3]/30 bg-[#0B1C1F]/90 shadow-inner">
            <h3 className="mb-2 text-xl font-bold sm:text-2xl text-white">
              Inquiry Submitted Successfully!
            </h3>

            {emailSent ? (
              <p className="mb-4 text-sm sm:text-base text-gray-300">
                Email confirmation sent to{" "}
                <span className="font-semibold text-emerald-400">
                  {submittedEmail}
                </span>
              </p>
            ) : (
              <p className="mb-4 text-sm sm:text-base text-gray-300">
                We’ve received your request. Keep your reference code safe.
              </p>
            )}

            <div className="w-full max-w-xs px-6 py-4 mt-1 mb-3 rounded-xl bg-[#051111]/80 border border-[#00ffb3]/30">
              <span className="block mb-1 text-sm font-semibold text-emerald-400">
                Your Reference Code:
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="text-xl font-bold tracking-wider text-white">
                  {successCode}
                </span>
                <button
                  onClick={copyRef}
                  className="px-3 py-1 text-xs font-medium rounded-md border border-[#00ffb3]/50 text-emerald-400 hover:bg-emerald-400/10 transition"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
             {/* Removed the "Track this inquiry" link */}
             {/*inquiryId && (
              <a
                href={`/track?ref=${encodeURIComponent(successCode)}`}
                className="mt-5 text-sm underline text-emerald-400"
              >
                Track this inquiry
              </a>
             */}

            <button
              className="mt-6 px-5 py-3 rounded-lg text-sm font-semibold border border-[#00ffb3]/40 text-emerald-400 hover:bg-emerald-400/10 transition"
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
          <form
            onSubmit={handleSubmit}
            className="space-y-5 sm:space-y-6"
            noValidate
          >
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              <Field
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                inputRef={firstFieldRef}
                autoComplete="name"
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              <Field
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
              />

              <div>
                <Label htmlFor="vehicleBrand">Vehicle Brand</Label>
                <select
                  id="vehicleBrand"
                  name="vehicleBrand"
                  className="w-full p-4 rounded-lg text-base bg-[#051111]/70 border border-[#00ffb3]/30 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  value={form.vehicleBrand}
                  onChange={handleChange}
                >
                  <option value="">Select Vehicle Brand</option>
                  {vehicleOptions.map((brand, idx) => (
                    <option key={idx} value={brand}>
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
            </div>

            <Field
              label="Part / Item"
              name="item"
              value={form.item}
              onChange={handleChange}
              placeholder="e.g., Front Grille, ECU, ABS Sensor"
            />

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your inquiry"
                className="w-full p-4 rounded-lg text-base min-h-[110px] resize-y bg-[#051111]/70 border border-[#00ffb3]/30 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            {error && (
              <p className="p-4 text-center rounded-lg text-red-400 bg-red-900/30 border border-red-500/40">
                {error}
              </p>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => !loading && onClose()}
                className="w-full min-h-[44px] rounded-lg font-semibold border border-[#00ffb3]/40 text-white hover:bg-emerald-400/10 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[44px] rounded-lg text-lg font-bold text-white bg-emerald-500/90 hover:bg-emerald-400 focus:outline-none disabled:opacity-60 transition"
              >
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
    <label
      htmlFor={htmlFor}
      className="block mb-2 text-sm font-semibold text-emerald-400"
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
        className="w-full p-4 rounded-lg text-base bg-[#051111]/70 border border-[#00ffb3]/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />
    </div>
  );
}
