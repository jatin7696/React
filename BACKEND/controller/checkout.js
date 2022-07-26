const Razorpay = require("razorpay");
require("../db/config");
const Order = require("../db/order");
module.exports = {

  createOrder: async (req, res) => {
    console.log("this is requestfororder  ", req.body);
    try {
      var instance = new Razorpay({
        key_id: process.env.Razorpay_Key,

        key_secret: process.env.Razorpay_secret,
      });
      console.log("key ", process.env.Razorpay_Key);
      let options = {
        amount: req.body.amount, // amount in the smallest currency unit
        currency: "INR",
      };
      const order = await instance.orders.create(
        options,
        function (err, order) {
          console.log("orders === ", order);
          if (order == null) {
            console.log("underidconditoion", order);
            return res.status(500).send("some error occured");
          }
          res.send(order);
        }
      );
    } catch (error) {
      console.log(error, "error aa gaya");
    }
  },

  
  getrazorpaykey: (req, res) => {
    res.send({ key: "rzp_test_AHarLPM8Zl6Anf" });
  },

  payOrder: async (req, res) => {
    try {
      const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
        req.body;
      const newOrder = Order({
        isPaid: true,
        amount: amount,
        razorpay: {
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
          signature: razorpaySignature,
        },
      });
      await newOrder.save();
      res.send({
        msg: "Payment was successfull",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
