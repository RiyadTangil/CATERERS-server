const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("user","_id shopName shopPhone shopImg");
    res.json(restaurants);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  //   console.log(req.body);
  const restaurant = new Restaurant({
    name: req.body.name,
    img: req.body.img,
    description: req.body.description,
    user: req.body.userId,
  });

  //   console.log(post);
  try {
    const savedRestaurant = await restaurant.save();
    res.json(savedRestaurant);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.json(restaurant);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
});

// router.get(":/postId", async (req, res) => {
//   try {
//     const post = await Restaurant.findById(req.params.postId);
//     res.json(post);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

router.delete(":/postId", async (req, res) => {
  try {
    const removedPost = await Restaurant.remove({ _id: req.params.postID });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
