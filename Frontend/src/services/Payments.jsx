import React from "react";
import axios from "axios";
//amount, name, email, phone

// function handleRedirect(paydone){
//     return(
//         <
//     )
// }

export async function handlepay({
	amount,
	name,
	email,
	phone,
	doctorDetails,
}) {
	const currency = "INR";
	const receiptId = `receipt_${Date.now()}`;

	try {
		// 1. Create Razorpay order
		const orderResponse = await axios.post(
			"http://localhost:5000/api/payment/order",
			{
				amount: amount * 100, // Convert to paise
				receipt: receiptId,
				currency,
				notes: {
					doctorId: doctorDetails._id,
					specialty: doctorDetails.specialty,
				},
			}
		);

		// 2. Setup Razorpay options
		const options = {
			key: process.env.REACT_APP_RAZORPAY_KEY_ID,
			amount: amount * 100,
			currency,
			name: "Telecare Health Services",
			description: `Consultation with Dr. ${name}`,
			image: "/logo.png",
			order_id: orderResponse.data.id,
			handler: async function (razorpayResponse) {
				try {
					// 3. Validate payment on your server
					const validationResponse = await axios.post(
						"http://localhost:5000/api/payment/validate",
						{
							...razorpayResponse,
							appointmentData: {
								doctor: doctorDetails._id,
								amount,
								currency,
							},
						}
					);

					return validationResponse.data;
				} catch (error) {
					console.error("Payment validation failed:", error);
					throw error;
				}
			},
			prefill: {
				name,
				email,
				contact: phone,
			},
			theme: {
				color: "#3399cc",
			},
		};

		// 4. Initialize Razorpay
		const rzp1 = new window.Razorpay(options);

		// 5. Set up event handlers
		rzp1.on("payment.failed", function (response) {
			const error = {
				code: response.error.code,
				description: response.error.description,
				step: response.error.step,
				metadata: response.error.metadata,
			};
			console.error("Payment failed:", error);
			throw new Error(`Payment failed: ${error.description}`);
		});

		// 6. Open payment modal
		rzp1.open();

		return new Promise((resolve, reject) => {
			rzp1.on("payment.success", function (response) {
				resolve(response);
			});
			rzp1.on("payment.failed", function (response) {
				reject(response.error);
			});
		});
	} catch (error) {
		console.error("Payment processing error:", error);
		throw error;
	}
}

// export default Payments;
