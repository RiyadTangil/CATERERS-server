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
        _id: savedUser._id,
        email: savedUser.email,
        phoneNo: savedUser.phoneNo,
        shopName: savedUser.shopName,
        shopImg: savedUser.shopImg,
        shopPhone: savedUser.shopPhone,
        password: savedUser.password,
        deliveryFee: savedUser.deliveryFee,
        deliveryTime: savedUser.deliveryTime,
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
  let password = req.body.password;
  let shopImg = req.body?.shopImg;
  let shopPhone = req.body.shopPhone;
  let typeOfPerson = req.body.typeOfPerson;
  let privetId = req.body.privetId;
  let projectId = req.body.projectId;
  let deliveryTime = req.body.deliveryTime;
  let deliveryFee = req.body.deliveryFee;
  const id = req.params.id;

  try {
    let updatedUser;
    if (name)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { name: name }, { new: true });
    if (password)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { password: password }, { new: true });
    if (address)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { address: address }, { new: true });
    if (phoneNo)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { phoneNo: phoneNo }, { new: true });
    if (email)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { email: email }, { new: true });
    if (shopName)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { shopName: shopName }, { new: true });
    if (shopImg)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { shopImg: shopImg }, { new: true });
    if (shopPhone)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { shopPhone: shopPhone }, { new: true });
    if (privetId)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { privetId: privetId }, { new: true });
    if (projectId)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { projectId: projectId }, { new: true });
    if (typeOfPerson)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { typeOfPerson: typeOfPerson }, { new: true });
    if (deliveryTime)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { deliveryTime: deliveryTime }, { new: true });
    if (deliveryFee)
      updatedUser = await User2.findOneAndUpdate({ _id: id }, { deliveryFee: deliveryFee }, { new: true });

    const token = jwt.sign(
      {
        _id: updatedUser._id,
        email: updatedUser.email,
        address: updatedUser.address,
        phoneNo: updatedUser.phoneNo,
        shopName: updatedUser.shopName,
        name: updatedUser.name,
        shopImg: updatedUser.shopImg,
        password: updatedUser.password,
        shopPhone: updatedUser.shopPhone,
        typeOfPerson: updatedUser.typeOfPerson,
        projectId: updatedUser.projectId,
        deliveryTime: updatedUser.deliveryTime,
        deliveryFee: updatedUser.deliveryFee,
        privetId: updatedUser.privetId
      },
      "riyad",
      {
        expiresIn: "24h",
      }
    );
    console.log(token, "Token")
    res.status(200).json({
      error: false,
      token: token,
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
