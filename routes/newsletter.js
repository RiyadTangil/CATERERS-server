
const { default: axios } = require("axios");
const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();

const Newsletter = require("../models/Newsletter");

// router.get("/", async (req, res) => {
//   console.log(req.body, "req.body.shopName");
//   var data = JSON.stringify([
//     {
//       id: "0",
//       title: "My Item number 0",
//       description: "Lorem ipsum",
//       image_url: "https://if-test-custom-api.herokuapp.com/asset/0",
//       last_update: 1591670070,
//       blob: { Item: "riyad.com" },
//     },
//   ]);
//   var config = {
//     method: "post",
//     url: "https://if-api.prismic.io/if/write/artparkwebsite--newsletter",
//     headers: {
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwcmlzbWljLmlvIiwiaWF0IjoxNjUzNTQyODQ3NDM2LCJjYXRhbG9nSWQiOiJhcnRwYXJrd2Vic2l0ZS0tbmV3c2xldHRlciJ9.lr0hEMm9K0m_AC94uU90DHjgsYXaHBODKnxQbtvbscU",
//       "Content-Type": "application/json",
//     },
//     data: data,
//   };
//   const sendData = (data) => {
//     return res.send({
//       success: true,
//       status: data.status,
//       message: "info added successfully",
//     });
//   };
//   const sendError = (error) => {
//     console.log(error, "error");
//     return res.badRequest({
//       success: false,
//       message: "something went wrong . please try again",
//     });
//   };
//   axios(config)
//     .then(function (res) {
//       sendData(res);
//     })
//     .catch(function (error) {
//       sendError(error);
//     });
// }
// );
router.post("/", async (req, res) => {

  var seconds = new Date().getTime()
  const data = JSON.stringify([
    {
      "id": seconds.toString(),
      "title": `My Item number ${seconds}`,
      "description": req?.body?.email,
      "image_url": "https://if-test-custom-api.herokuapp.com/asset/0",
      "last_update": seconds,
      "blob": {
        "email": req?.body?.email,
        "name": req?.body?.name,
      }
    },
  ]);
  const config = {
    method: "post",
    url: "https://if-api.prismic.io/if/write/artparkwebsite--newsletter",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwcmlzbWljLmlvIiwiaWF0IjoxNjUzNTQyODQ3NDM2LCJjYXRhbG9nSWQiOiJhcnRwYXJrd2Vic2l0ZS0tbmV3c2xldHRlciJ9.lr0hEMm9K0m_AC94uU90DHjgsYXaHBODKnxQbtvbscU",
      "Content-Type": "application/json",
    },
    data: data,
  };
  const sendData = (data) => {
    console.log(data.config.data, "config");
    return res.send({
      success: true,
      status: data.status,
      data: data.config.data,
      message: "info added successfully.",
    });
  };
  const sendError = (error) => {
    console.log(error, "error");
    return res.badRequest({
      success: false,
      message: "something went wrong . please try again",
    });
  };
  axios(config)
    .then(function (res) {
      sendData(res);
    })
    .catch(function (error) {
      sendError(error);
    });
}
);

module.exports = router;
