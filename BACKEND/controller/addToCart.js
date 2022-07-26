const Cart = require("../db/cart");
module.exports = {
    addToCart : async (req, res) => {
        // console.log("this is node add to cart == > ", req.body);
        if (req.body != null) {
          console.log("this is node add to cart == > ", req.body);
          let data = req.body;
          //const userId = JSON.parse(localStorage.getItem("user"))._id;
          //  console.log("this is user id ==> ", userId);
          //for (var i = 0; i <= data.length; i++) {
          // if (data[i].userId != null) {
          // console.log("this is from object userid ==== > ", data[i].userId);
          const cartData = await Cart(req.body);
          console.log("this is cart data ====== ", cartData);
          const result = await cartData.save();
          console.log("this is cart result ====== ", result);
          res.send(result);
          //}
          // }
          // let user = await User.findById(req.body.userId);
          // console.log("this is matched userid == ", user);
        }
      
        // var cartProduct = [req.body];``
        //cartProduct = req.body._id;
        //console.log("cartProduct === >  ", cartProduct);
      }, 
};