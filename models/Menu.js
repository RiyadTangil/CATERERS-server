const mongoose = require("mongoose");
const MenuSchema = mongoose.Schema({
  foodName:{
    type: String,
    required: true
  },
  foodPrice:{
    type: String,
    required: true
  },
  foodImg:{
    type: String,
    required: true
  },
  foodDescription:{
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  catererId:{
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Menus", MenuSchema);
