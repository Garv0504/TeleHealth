const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

exports.createOrder = async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: req.body.amount,
      currency: req.body.currency,
      receipt: req.body.receipt,
      notes: req.body.notes,
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.validatePayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: "Invalid signature" });
    }

    res.json({
      success: true,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
