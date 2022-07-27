const Product = require("../db/Product");
const Contact = require("../db/Contact");

module.exports = {
  searchProduct: async (req, resp) => {
    // console.log("thisissearchhhhhhhhhhhhhhhhhh", req);
    let result = await Product.find({
      $or: [
        {
          name: { $regex: req.params.key },
        },
        {
          company: { $regex: req.params.key },
        },
        {
          category: { $regex: req.params.key },
        },
      ],
    });
    //console.log("thisissearchhhhhhhhhhhhhhhhhh  ", result);
    resp.send(result);
  },

  addProduct: async (req, resp) => {
    console.log(req.body.price);
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
  },

  products: async (req, resp) => {
    try {
      const page = parseInt(req.query.page) || "0";
      console.log("this is page === ", page);
      const pageSize = 4;
      const total = await Product.countDocuments({});
      // const { l } = req.query;
      // console.log(page);
      const products = await Product.find()
        .limit(pageSize)
        .skip(pageSize * page);
      resp.json({
        total,
        totalPages: Math.ceil(total / pageSize),
        products,
      });

      if (products.length > 0) {
        resp.send("test");
        // resp.status(400).json({
        //   products,
        //   success: true,
        // });
      } else {
        resp.send({ result: "No Product found" });
      }
    } catch (err) {
      console.log("hard error", err);
    }
  },

  deleteProduct: async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
  },
  productById: async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
      resp.send(result);
    } else {
      resp.send({ result: "No Record Found." });
    }
  },

  updateProduct: async (req, resp) => {
    console.log("this is update product id ", req.params.id);
    let result = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    console.log("this is update product result ", result);
    resp.send(result);
  },

  contact: async (req, res) => {
    console.log("this is contact us API ==== ", req.body);
    let contact = await Contact(req.body);
    let result = await contact.save();
    console.log("this is contact result === ", result);
    res.send(result);
  },
};
