const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const User2 = require("../models/User2");

router.post("/", async (req, res) => {
  //   console.log(req.body);

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
        user_id: userData[0]._id,
        name: userData[0].name,
        address:  userData[0].address,
        email: userData[0].email,
        userType: userData[0].typeOfPerson
      },
      "riyad",
      {
        expiresIn: "24h",
      }
    );


    res.status(200).json({
      error: false,
      data: userData,
      token: token,
      message: "login completed"
    }

    );


  } catch (err) {
    res.json({ message: err });
  }
});



module.exports = router;
