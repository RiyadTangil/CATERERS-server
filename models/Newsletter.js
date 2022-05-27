const mongoose = require("mongoose");
const newsLetterSchema = mongoose.Schema({
  items: {
    type: String,
    required: true,
  },

});
module.exports = mongoose.model("Newsletter", newsLetterSchema);