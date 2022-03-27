const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();

const User2 = require("../models/User2");

router.get("/", async (req, res) => {
  try {

    const posts = await User2.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  //   console.log(req.body);
  const post = new User2({
    name: req.body.name,
    address: req.body.address,
    phoneNo: req.body.phoneNo,
    email: req.body.email,
    password: req.body.password,
    shopName: req.body.shopName,
    shopPhone: req.body.shopPhone,
    typeOfPerson: req.body.typeOfPerson,
  });

  //   console.log(post);
  try {
    let savedPost = await post.save();
    const token = jwt.sign(
      { user_id: savedPost._id, email: savedPost.email },
      "riyad",
      {
        expiresIn: "24h",
      }
    );
    // const responsData = { token, userData }
    // console.log(token);
    res.status(200).json({
      error: false,
      data: savedPost,
      token: token,
      message: "registration completed"
    })

  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await User2.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
});

// router.get(":/postId", async (req, res) => {
//   try {
//     const post = await User2.findById(req.params.postId);
//     res.json(post);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

router.delete(":/postId", async (req, res) => {
  try {
    const removedPost = await User2.remove({ _id: req.params.postID });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;