const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
<<<<<<< HEAD
    isPaid: Boolean,
    amount: Number,
    razorpay: {
      orderId: String,
      paymentId: String,
      signature: String,
    },
  });

  module.exports = mongoose.model('Order', OrderSchema);
=======
  isPaid: Boolean,
  amount: Number,
  razorpay: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
>>>>>>> master
