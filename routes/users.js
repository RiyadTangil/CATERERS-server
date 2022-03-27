const express = require("express");
const router = express.Router();

// const Post = require("../models/Post");
const User = require("../models/User");

router.post("/", async (req, res) => {
  //   console.log(req.body);
  const user = new User({
    name: req.body.name,
    address: req.body.address,
    phoneNo: req.body.phoneNo,
    email: req.body.email,
    password: req.body.password,
    typeOfPerson: req.body.typeOfPerson,
  });

  //   console.log(post);
  try {
    const savedUser = await user.save();
  
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
});

router.get("/:userID", async (req, res) => {
  try {
    const user = await User.find({ userID: req.params.userID });
    res.json(user);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
});

// router.delete(":/postId", async (req, res) => {
//   try {
//     const removedPost = await Post.remove({ _id: req.params.postID });
//     res.json(removedPost);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// router.patch(":/postId", async (req, res) => {
//   try {
//     const updatedPost = await Post.updateOne(
//       { _id: req.params.postID },
//       { $set: { title: req.body.title } }
//     );
//     res.json(removedPost);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

module.exports = router;
