const express = require("express");

const router = express.Router();

const Category = require("../models/Category");
const User2 = require("../models/User2");

router.get("/", async (req, res) => {
  try {
    const category = await Category.find();
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
      userEmail: req.body.email,
    });
    const savedCategory = await category.save();
    // await User2.updateOne({
    //   _id: req.body.userId
    // }, {
    //   $push: {
    //     todos: savedCategory._id
    //   }
    // });
    res.json(savedCategory);
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
