const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: { type: Schema.Types.ObjectId, ref: "category" },
  user: { type: Schema.Types.ObjectId, ref: "user" },
});

const BLOG = mongoose.model("blog", blogSchema);

module.exports = BLOG;
