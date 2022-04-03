const express = require("express");

const router = express.Router();

const Category = require("../models/Category");
const User2 = require("../models/User2");
const Restaurant = require("../models/Restaurant");

router.get("/", async (req, res) => {
  try {
    const category = await Category.find({});
    res.json(category);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/foodByCategory/:id", async (req, res) => {
  try {
    const category = await Category.find({ user: req.params.id }).populate("foods","foodName  foodPrice foodImg foodDescription userId");
    res.json(category);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/categoryByUser/:id", async (req, res) => {
  try {
    const category = await Category.find({ user: req.params.id });
    res.json(category);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  //   console.log(req.body);
  //   console.log(post);
  try {
    const category = new Category({
      categoryName: req.body.categoryName,
      user: req.body.id
    });
    const savedCategory = await category.save();
    const previousRestaurant = await Restaurant.find({ user: req.body.id });
    let isRestaurantAdded = false;
    if (previousRestaurant.length < 1) {
      const restaurant = new Restaurant({ user: req.body.id });
       const savedRestaurant= await restaurant.save();
       isRestaurantAdded=true
      console.log(savedRestaurant, "added")
    }
    res.status(200).json({
      error: false,
      data: savedCategory,
      message: "category added"
    })
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    const removedCategory = await Category.remove({ _id: req.params.id });
    res.json(removedCategory);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
