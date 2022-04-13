const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();

const User2 = require("../models/User2");

router.get("/", async (req, res) => {
  try {

    const users = await User2.find({});
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/with-category", async (req, res) => {
  try {

    const users = await User2.find({}).populate("categories",);
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  // console.log(req.body);
  const user = new User2({
    name: req.body.name,
    address: req.body.address,
    phoneNo: req.body.phoneNo,
    email: req.body.email,
    password: req.body.password,
    shopName: req.body.shopName,
    shopImg: req.body.shopImg,
    shopPhone: req.body.shopPhone,
    typeOfPerson: req.body.typeOfPerson,
  });

  //   console.log(user);
  try {
    let userData = await User2.find({ "email": req.body.email });
    console.log(userData.length);
    if (userData.length > 0) {
      throw ({ error: 'user already exists' });
    }
    let savedUser = await user.save();

    const token = jwt.sign(
      {
        user_id: savedUser._id,
        email: savedUser.email,
        phoneNo: savedUser.phoneNo,
        shopName: savedUser.shopName,
        shopImg: savedUser.shopImg,
        shopPhone: savedUser.shopPhone,
        typeOfPerson: savedUser.typeOfPerson
      },
      "riyad",
      {
        expiresIn: "24h",
      }
    );
    // const responsData = { token, userData }
    // console.log(token);
    res.status(200).json({
      error: false,
      data: savedUser,
      token: token,
      message: "registration completed"
    })

  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User2.findById(req.params.id).populate("categories");
    res.json(user);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
});
router.get("/restaurantInfo/:id", async (req, res) => {
  try {
    const user = await User2.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
});

router.put('/:id', async (req, res) => {
  let name = req.body.name;
  let address = req.body.address;
  let phoneNo = req.body.phoneNo;
  let email = req.body.email;
  let shopName = req.body.shopName;
  let shopImg = req.body.shopImg;
  let shopPhone = req.body.shopPhone;
  let typeOfPerson = req.body.typeOfPerson;
  let privetId = req.body.privetId;
  let projectId = req.body.projectId;
  const id = req.params.id;

  try {
    let updatedUser;
    if (name)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { name: name });
    if (address)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { address: address });
    if (phoneNo)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { phoneNo: phoneNo });
    if (email)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { email: email });
    if (shopName)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { shopName: shopName });
    if (shopImg)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { shopImg: shopImg });
    if (shopPhone)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { shopPhone: shopPhone });
    if (privetId)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { privetId: privetId });
    if (projectId)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { projectId: projectId });
    if (typeOfPerson)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { typeOfPerson: typeOfPerson });
    res.status(200).json({
      error: false,
      data: updatedUser,
      message: "update completed"
    })
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
})

router.delete(":/postId", async (req, res) => {
  try {
    const removedPost = await User2.remove({ _id: req.params.postID });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
