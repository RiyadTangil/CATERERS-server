const express = require('express')
const router = express.Router()
const Menu = require('../models/Menu')
const BasicSchema = require('../models/Basic')
const Foodv2Schema = require('../models/menu/Foodv2')
const CategorySchema = require('../models/menu/Category')
const MenuSchema = require('../models/menu/Menu')

router.post('/createMenu', (req, res, next) => {
  const {
    menuName
  } = req.body
  const newMenu = new MenuSchema({
    menuName: menuName,
    categoryCount: 0
  })
  newMenu.save()
    .then((menu) => {
      BasicSchema.find().then((basic) => {
        const count = basic[0].menuCount ? (basic[0].menuCount + 1) : 1
        BasicSchema.findByIdAndUpdate('623d343db59875927a3d494c', { menuCount: count }, { new: true })
          .then((updatedBasic) => {
            console.log('[Creation] A  menu  , menuName   : ' + menuName)
            res.status(200).json({
              menuName: menuName
            })
          })
          .catch((err) => console.log(err))
      })
    })
    .catch((err) => console.log(err))
})

router.post('/createCategory', (req, res, next) => {
  console.log('creating a category')
  console.log(req.body)
  const {
    categoryNamE,
    foodCount,
    foodList
  } = req.body
  const newCategory = new CategorySchema({
    categoryName: categoryNamE,
    foodCount: foodCount,
    foodlist: foodList
  })
  BasicSchema.find().then((basic) => {
    const currentMenuId = basic[0].currentMenuId
    newCategory.save()
      .then((category) => {
        if (category) {
          MenuSchema
            .findOne({ currentMenuId: currentMenuId })
            .then((menu) => {
              if (menu) {
                const categoryList = menu.categoryList
                categoryList.push({ category: category._id })
                const count = menu.categoryCount = (menu.categoryCount + 1)
                MenuSchema
                  .findByIdAndUpdate(
                    menu._id,
                    {
                      categoryList: categoryList,
                      categoryCount: count
                    },
                    { new: true }
                  )
                  .then((updatedMenu) => {
                    console.log('[Creation] An author, categoryName :' + categoryNamE)
                    res.status(200).json({ categoryName: categoryNamE })
                  })
                  .catch((err) => console.log(err))
              }
            })
            .catch((err) => console.log(err))
        }
      }).catch((err) => console.log(err))
  })
})

router.post('/createFood', (req, res, next) => {
  console.log('creating a food')
  console.log(req.body)
  const {
    categoryId,
    foodName,
    foodDescription,
    foodPrice
  } = req.body
  const newFood = new Foodv2Schema({
    foodName: foodName,
    foodDescription: foodDescription,
    foodPrice: foodPrice
  })
  newFood.save()
    .then((food) => {
      if (food) {
        CategorySchema
          .findOne({ _id: categoryId })
          .then((category) => {
            if (category) {
              const foodList = category.foodList
              foodList.push({ food: food._id })
              const count = category.foodCount = (category.foodCount + 1)
              CategorySchema
                .findByIdAndUpdate(
                  category._id,
                  {
                    foodList: foodList,
                    foodCount: count
                  },
                  { new: true }
                )
                .then((updatedCategory) => {
                  console.log('[Creation] A food, foodName :' + foodName)
                  res.status(200).json({ foodName: foodName })
                })
                .catch((err) => console.log(err))
            }
          })
          .catch((err) => console.log(err))
      }
    }).catch((err) => console.log(err))
})

router.get('/food/:id', (req, res) => {
  const { id } = req.params
  // console.log('HElo', id)
  Foodv2Schema
    .findById(id)
    .then((tt) => {
      res.json(tt)
    })
    .catch((err) => console.log(err))
})

router.get('/all', (req, res) => {
  MenuSchema
    .find()
    .populate({
      path: 'categoryList.category',
      populate: {
        path: 'foodList.food'
      }
    })
    .then((tt) => {
      res.json(tt)
    })
    .catch((err) => console.log(err))
})

router.get('/', (req, res) => res.status(200).send(JSON.stringify('Welcome to MENUS!')))

module.exports = router
