import { useState } from 'react';

const vehicleOptions = [
  'Range Rover',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Volvo',
  'Volkswagen',
  'Porsche',
  'MG',
  'Ford',
  'Jaguar',
  'Renault',
  'Peugeot',
  'Mini Cooper',
  'Other (please specify)'
];

export default function GetQuotationForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    vehicleBrand: '',
    description: '',
    customBrand: '',
  });

  const [loading, setLoading] = useState(false);
  const [successCode, setSuccessCode] = useState(null);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    const requiredFields = ['fullName', 'email', 'phone', 'vehicleBrand', 'description'];
    let isEmpty = requiredFields.some((field) => !form[field].trim());
    // If 'Other', customBrand is required
    if (form.vehicleBrand === 'Other (please specify)' && !form.customBrand.trim()) {
      isEmpty = true;
    }
    if (isEmpty) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    // Store the email for display in success message
    setSubmittedEmail(form.email);

    // Simulate API call
    setTimeout(() => {
      const mockRef = 'REF-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      setSuccessCode(mockRef);
      setForm({
        fullName: '',
        email: '',
        phone: '',
        vehicleBrand: '',
        description: '',
        customBrand: '',
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-lg mx-auto p-0 font-sans">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-yellow-400 tracking-tight mb-2">Parts Inquiry Form</h2>
        <p className="text-gray-300 text-sm">Tell us about your vehicle and requirements</p>
      </div>

      {successCode ? (
        <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 border border-green-500/30 rounded-2xl p-8 text-center flex flex-col items-center backdrop-blur-sm">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-green-400 mb-3">Inquiry Submitted Successfully!</h3>
          <p className="text-gray-300 text-base mb-4">Thank you for reaching out to us. Your inquiry has been received and we'll get back to you within 24 hours.</p>
          
          {/* Email Confirmation */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 mb-4 w-full max-w-sm">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-blue-400 font-semibold text-sm">Email Confirmation Sent</span>
            </div>
            <p className="text-blue-300 text-xs">A confirmation email with your reference number has been sent to <span className="font-semibold">{submittedEmail}</span></p>
          </div>
          
          <div className="bg-gray-800/50 border border-green-500/30 rounded-xl px-6 py-4 mt-2 mb-3 w-full max-w-xs">
            <span className="block text-green-400 font-semibold text-sm mb-1">Your Reference Code:</span>
            <span className="text-green-300 font-bold text-xl tracking-wider">{successCode}</span>
          </div>
          <p className="text-green-400/80 text-xs">Please keep this code for your records or future correspondence.</p>
          
          {/* Next Steps */}
          <div className="mt-4 p-4 bg-gray-800/30 rounded-xl border border-gray-600/30">
            <h4 className="text-yellow-400 font-semibold text-sm mb-2">What happens next?</h4>
            <ul className="text-gray-300 text-xs space-y-1 text-left">
              <li>• Our team will review your inquiry within 24 hours</li>
              <li>• You'll receive a detailed quote via email</li>
              <li>• We'll contact you to discuss further details</li>
            </ul>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-yellow-400 mb-2">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              className="w-full p-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-base bg-gray-800/50 transition text-white placeholder-gray-400 backdrop-blur-sm"
              value={form.fullName}
              onChange={handleChange}
              style={{ fontFamily: 'inherit' }}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-yellow-400 mb-2">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-base bg-gray-800/50 transition text-white placeholder-gray-400 backdrop-blur-sm"
              value={form.email}
              onChange={handleChange}
              style={{ fontFamily: 'inherit' }}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-yellow-400 mb-2">Phone</label>
            <input
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className="w-full p-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-base bg-gray-800/50 transition text-white placeholder-gray-400 backdrop-blur-sm"
              value={form.phone}
              onChange={handleChange}
              style={{ fontFamily: 'inherit' }}
            />
          </div>
          <div>
            <label htmlFor="vehicleBrand" className="block text-sm font-semibold text-yellow-400 mb-2">Vehicle Brand</label>
            <select
              id="vehicleBrand"
              name="vehicleBrand"
              className="w-full p-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-base bg-gray-800/50 transition text-white backdrop-blur-sm"
              value={form.vehicleBrand}
              onChange={handleChange}
              style={{ fontFamily: 'inherit' }}
            >
              <option value="" className="bg-gray-800 text-white">Select Vehicle Brand</option>
              {vehicleOptions.map((brand, idx) => (
                <option key={idx} value={brand} className="bg-gray-800 text-white">{brand}</option>
              ))}
            </select>
            {form.vehicleBrand === 'Other (please specify)' && (
              <input
                type="text"
                name="customBrand"
                placeholder="Enter your vehicle brand/model"
                className="mt-3 w-full p-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-base bg-gray-800/50 transition text-white placeholder-gray-400 backdrop-blur-sm"
                value={form.customBrand}
                onChange={handleChange}
                style={{ fontFamily: 'inherit' }}
              />
            )}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-yellow-400 mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your inquiry"
              className="w-full p-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-base bg-gray-800/50 transition min-h-[100px] text-white placeholder-gray-400 backdrop-blur-sm resize-none"
              value={form.description}
              onChange={handleChange}
              style={{ fontFamily: 'inherit' }}
            />
          </div>
          {error && <p className="text-red-400 bg-red-900/20 border border-red-500/30 rounded-xl p-4 text-center backdrop-blur-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-lg shadow-lg transition bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-yellow-500/25"
            style={{ fontFamily: 'inherit', letterSpacing: '0.02em' }}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                Submitting...
              </span>
            ) : (
              'Inquire Now'
            )}
          </button>
        </form>
      )}
    </div>
  );
}
