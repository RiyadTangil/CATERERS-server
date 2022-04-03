const express = require("express");
const router = express.Router();
const Food = require("../models/Food");
const Category = require("../models/Category");

router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
})


router.post("/", async (req, res) => {
  try {
    const food = new Food({
      foodName: req.body.name,
      foodPrice: req.body.price,
      foodImg: req.body.img,
      foodDescription: req.body.description,
      category: req.body.category,
      userId: req.body.userId,
      produceAvailable: req.body.produceAvailable,
      publishStatus: req.body.publishStatus,
  
    });
    const savedFood = await food.save();
    console.log(req.body.catererId);
    await Category.updateOne({
      _id: req.body.catererId
    }, {
      $push: {
        foods: savedFood._id
      }
    });
    res.status(200).json({
      error: false,
      data: savedFood,
      message: "food added successfully"
    })
 
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    res.json(food);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedFood = await Food.remove({ _id: req.params.id });
    res.json(removedFood);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
});

router.put('/:id', async (req, res) => {
  let foodPrice = req.body.price;
  let foodName = req.body.name;
  let description = req.body.description;
  let category = req.body.category;
  let foodImg = req.body.img;
  let produceAvailable = req.body.produceAvailable;
  let publishStatus = req.body.publishStatus;
  const id = req.params.id;

  try {
    let updatedFood;
    if (description)
      updatedFood = await Food.findOneAndUpdate({ _id: id }, { foodDescription: description });
    if (foodPrice)
      updatedFood = await Food.findOneAndUpdate({ _id: id }, { foodPrice: foodPrice });
    if (foodName)
      updatedFood = await Food.findOneAndUpdate({ _id: id }, { foodName: foodName });
    if (category)
      updatedFood = await Food.findOneAndUpdate({ _id: id }, { category: category });
    if (produceAvailable)
      updatedFood = await Food.findOneAndUpdate({ _id: id }, { produceAvailable: produceAvailable });
    if (publishStatus)
      updatedFood = await Food.findOneAndUpdate({ _id: id }, { publishStatus: publishStatus });
    if (foodImg)
      updatedFood = await Food.findOneAndUpdate({ _id: id }, { foodImg: foodImg });
    res.status(200).json({
      error: false,
      data: updatedFood,
      message: "update completed"
    })
  } catch (err) {
    res.status(404);
    res.json({ message: err });
  }
})

module.exports = router;
