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
    <div className="max-w-lg mx-auto mt-8 p-6 border border-gray-200 rounded-2xl bg-white shadow-lg font-sans">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 tracking-tight text-center">Get a Quotation</h2>

      {successCode ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center flex flex-col items-center">
          <h3 className="text-2xl font-bold text-green-700 mb-2">Thank you for your inquiry!</h3>
          <p className="text-green-800 text-base mb-2">We appreciate you reaching out to us. Your request has been received and a member of our team will contact you soon.</p>
          <div className="bg-white border border-green-100 rounded-lg px-4 py-3 mt-3 mb-1 w-full max-w-xs">
            <span className="block text-green-700 font-semibold text-sm mb-1">Your Reference Code:</span>
            <span className="text-green-900 font-bold text-lg tracking-wider">{successCode}</span>
          </div>
          <p className="text-green-700 text-xs mt-2">Please keep this code for your records or future correspondence.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-gray-50 transition text-gray-900 placeholder-gray-400"
              value={form.fullName}
              onChange={handleChange}
              style={{ fontFamily: 'inherit' }}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-gray-50 transition text-gray-900 placeholder-gray-400"
              value={form.email}
              onChange={handleChange}
              style={{ fontFamily: 'inherit' }}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-gray-50 transition text-gray-900 placeholder-gray-400"
              value={form.phone}
              onChange={handleChange}
              style={{ fontFamily: 'inherit' }}
            />
          </div>
          <div>
            <label htmlFor="vehicleBrand" className="block text-sm font-medium text-gray-700 mb-1">Vehicle Brand</label>
            <select
              id="vehicleBrand"
              name="vehicleBrand"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-gray-50 transition text-gray-900"
              value={form.vehicleBrand}
              onChange={handleChange}
              style={{ fontFamily: 'inherit' }}
            >
              <option value="">Select Vehicle Brand</option>
              {vehicleOptions.map((brand, idx) => (
                <option key={idx} value={brand}>{brand}</option>
              ))}
            </select>
            {form.vehicleBrand === 'Other (please specify)' && (
              <input
                type="text"
                name="customBrand"
                placeholder="Enter your vehicle brand/model"
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-gray-50 transition text-gray-900 placeholder-gray-400"
                value={form.customBrand}
                onChange={handleChange}
                style={{ fontFamily: 'inherit' }}
              />
            )}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your inquiry"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-gray-50 transition min-h-[90px] text-gray-900 placeholder-gray-400"
              value={form.description}
              onChange={handleChange}
              style={{ fontFamily: 'inherit' }}
            />
          </div>
          {error && <p className="text-red-600 bg-red-50 border border-red-200 rounded p-2 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold text-lg shadow-md transition bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105"
            style={{ fontFamily: 'inherit', letterSpacing: '0.02em' }}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                Submitting...
              </span>
            ) : (
              'Get Quotation'
            )}
          </button>
        </form>
      )}
    </div>
  );
}
