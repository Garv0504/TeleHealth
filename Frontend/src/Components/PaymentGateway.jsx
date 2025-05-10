import { useState } from 'react';
import { CreditCard, Truck, DollarSign, ChevronsRight, AlertCircle } from 'lucide-react';

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate personal information
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    
    // Validate address
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    // Validate payment method
    if (!paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
    
    // Validate card details if credit card is selected
    if (paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setFormSubmitted(true);
    
    // Validate form before submission
    if (validateForm()) {
      // In a real app, this would handle payment processing
      console.log('Form submitted:', formData);
      alert('Payment form submitted successfully!');
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left panel - Order Summary */}
          <div className="bg-indigo-600 text-white p-8 md:w-1/3">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$89.99</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$4.99</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$7.50</span>
              </div>
              <div className="border-t border-indigo-400 pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>$102.48</span>
              </div>
            </div>

          </div>

          {/* Right panel - Payment Form */}
          <div className="p-8 md:w-2/3">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Payment Details</h1>
            <div>
              {/* Personal Details */}
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {(formSubmitted && errors.firstName) && (
                      <div className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {(formSubmitted && errors.lastName) && (
                      <div className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.lastName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  {(formSubmitted && errors.email) && (
                    <div className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">Shipping Address</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  {(formSubmitted && errors.address) && (
                    <div className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.address}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {(formSubmitted && errors.city) && (
                      <div className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.city}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {(formSubmitted && errors.zipCode) && (
                      <div className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.zipCode}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">Payment Method</h2>
                {(formSubmitted && errors.paymentMethod) && (
                  <div className="text-red-500 text-sm mb-2 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.paymentMethod}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div
                    className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CreditCard className={`mb-2 ${paymentMethod === 'card' ? 'text-indigo-600' : 'text-gray-500'}`} />
                    <span className={`text-sm font-medium ${paymentMethod === 'card' ? 'text-indigo-600' : 'text-gray-600'}`}>Credit Card</span>
                  </div>
                  <div
                    className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'cash' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300'
                    }`}
                    onClick={() => setPaymentMethod('cash')}
                  >
                    <DollarSign className={`mb-2 ${paymentMethod === 'cash' ? 'text-indigo-600' : 'text-gray-500'}`} />
                    <span className={`text-sm font-medium ${paymentMethod === 'cash' ? 'text-indigo-600' : 'text-gray-600'}`}>Cash on Delivery</span>
                  </div>
                  <div
                    className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'square' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300'
                    }`}
                    onClick={() => setPaymentMethod('square')}
                  >
                    <svg className={`h-6 w-6 mb-2 ${paymentMethod === 'square' ? 'text-indigo-600' : 'text-gray-500'}`} viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                      <path d="M15 9l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className={`text-sm font-medium ${paymentMethod === 'square' ? 'text-indigo-600' : 'text-gray-600'}`}>SquareUp</span>
                  </div>
                </div>
              </div>

              {/* Credit Card Details - Only shown if card payment method is selected */}
              {paymentMethod === 'card' && (
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-700 mb-4">Card Details</h2>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-3 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {(formSubmitted && errors.cardNumber) && (
                      <div className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.cardNumber}
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {(formSubmitted && errors.cardName) && (
                      <div className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.cardName}
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className={`w-full px-3 py-2 border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      />
                      {(formSubmitted && errors.expiryDate) && (
                        <div className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.expiryDate}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        className={`w-full px-3 py-2 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      />
                      {(formSubmitted && errors.cvv) && (
                        <div className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.cvv}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div
                onClick={handleSubmit}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center font-medium cursor-pointer"
              >
                Complete Payment <ChevronsRight size={18} className="ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}