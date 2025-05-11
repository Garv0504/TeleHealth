import React from "react";
import axios from "axios";
import loadRazorpayScript from "./Razorpay";
//amount, name, email, phone

// function handleRedirect(paydone){
//     return(
//         <
//     )
// }

export async function handlepay({ amount, name, email, phone }) {

	const res = await loadRazorpayScript();
	if (!res) {
		alert("Razorpay SDK failed to load. Are you online?");
		return;
	}

	return new Promise((resolve, reject) => {
		const currency = "INR";
		const receiptId = `receipt_${Date.now()}`;

		try {
			axios
				.post("http://localhost:5000/api/payment/order", {
					amount: amount * 100, // Convert to paise
					currency,
					receipt: receiptId,
					notes: { name, email },
				})
				.then((orderResponse) => {
					const options = {
						key: import.meta.env.VITE_REACT_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
						amount: orderResponse.data.amount,
						currency,
						name: "Healthcare App",
						description: `Appointment with ${name}`,
						order_id: orderResponse.data.id,
						handler: function (response) {
							axios
								.post("http://localhost:5000/api/payment/validate", response)
								.then((validationResponse) => {
									if (validationResponse.data.success) {
										resolve({
											success: true,
											paymentId: response.razorpay_payment_id,
											...validationResponse.data,
										});
									} else {
										reject(new Error("Payment validation failed"));
									}
								})
								.catch((error) => reject(error));
						},
						prefill: { name, email, contact: phone },
						theme: { color: "#3399cc" },
					};

					const rzp1 = new window.Razorpay(options);

					rzp1.on("payment.failed", function (response) {
						reject(new Error(response.error.description));
					});

					rzp1.open();
				})
				.catch((error) => reject(error));
		} catch (error) {
			reject(error);
		}
	});
}
// export default Payments;
