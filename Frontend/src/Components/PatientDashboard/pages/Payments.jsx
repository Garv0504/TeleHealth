import React from 'react';
import { CreditCard, Download } from 'lucide-react';
import { payments } from '../../../data/patientData'; // Assuming you have a payments data file

const Payments = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Payments & Billing</h1>
        <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
          <CreditCard size={16} className="mr-1" />
          Manage Payment Methods
        </button>
      </div>

      {payments.length === 0 ? (
        "Hellow"
      ) : (
        <div className="space-y-6">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Payment History</h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        #{payment.invoiceNumber}
                      </div>
                      <div className="text-sm text-gray-500">{payment.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${payment.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : payment.status === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 flex items-center justify-end">
                        <Download size={16} className="mr-1" />
                        Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Payment Summary</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-green-800">Total Paid</div>
                  <div className="mt-1 text-2xl font-semibold text-green-900">
                    ${payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-yellow-800">Pending</div>
                  <div className="mt-1 text-2xl font-semibold text-yellow-900">
                    ${payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-blue-800">Insurance Coverage</div>
                  <div className="mt-1 text-2xl font-semibold text-blue-900">
                    $350.00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;