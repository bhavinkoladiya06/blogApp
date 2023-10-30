const mongoose=require('mongoose')
const Schema=mongoose.Schema


const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

const CATEGORY = mongoose.model("category", categorySchema);

module.exports = CATEGORY;