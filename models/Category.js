const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Categories", CategorySchema);
