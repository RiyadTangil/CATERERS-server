const express = require("express");

const router = express.Router();

const Order = require("../models/Orders");

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email phoneNo");
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  //   console.log(req.body);
  const order = new Order({
    price: req.body.price,
    paymentId: req.body.paymentId,
    status: req.body.status,
    ordersItems: req.body.ordersItems,
    user: req.body.id

  });

    console.log(req.body.id);
  try {
    const savedOrder = await order.save();
    res.json(savedOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put('/:id', async (req, res) => {
  let status = req.body.status;
  const id = req.params.id;
  try {
    let updatedOrderStatus;
    if (status)
      updatedOrderStatus = await Order.findOneAndUpdate({ _id: id }, { status: status });
    res.status(200).json({
      error: false,
      data: updatedOrderStatus,
      message: "update completed"
    })
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
})


// router.get(":/postId", async (req, res) => {
//   try {
//     const post = await Order.findById(req.params.postId);
//     res.json(post);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

router.delete(":/postId", async (req, res) => {
  try {
    const removedPost = await Order.remove({ _id: req.params.postID });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
