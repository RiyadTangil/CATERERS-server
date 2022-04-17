const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const User2 = require("../models/User2");

router.post("/", async (req, res) => {


  try {
    let userData = await User2.find({ "email": req.body.email });
    if (userData.length === 0) {
      throw ({ error: 'No email  info available' })
    }

    if (userData[0].password !== req.body.password) {
      throw ({ error: 'password in not matched' })
    }
    const token = jwt.sign(
      {
        _id: userData[0]._id,
        name: userData[0].name,
        address: userData[0].address,
        email: userData[0].email,
        phoneNo: userData[0].phoneNo,
        shopImg: userData[0].shopImg,
        shopName: userData[0].shopName,
        shopPhone: userData[0].shopPhone,
        typeOfPerson: userData[0].typeOfPerson,
        profileImg: userData[0]?.profileImg,
        password: userData[0]?.password,
        projectId: userData[0]?.projectId,
        deliveryFee: userData[0]?.deliveryFee,
        deliveryTime: userData[0]?.deliveryTime,
        privetId: userData[0]?.privetId
      },
      "riyad",
      {
        expiresIn: "24h",
      }
    );


    res.status(200).json({
      error: false,
      data: userData[0],
      token: token,
      message: "login completed"
    }

    );


  } catch (err) {
    res.json({ message: err });
  }
});



module.exports = router;
