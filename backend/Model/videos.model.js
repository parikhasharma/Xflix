const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  videoLink: {
    type: String,
    required: true,
    unique: true,
     trim : true
  },
  title: {
    type: String,
    required: true,
    trim : true
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  contentRating: {
    type: String,
    required: true,
    trim: true,
  },
  releaseDate: {
    type: String,
    required: true,
    trim : true
  },
  previewImage: {
    type: String,
    required: true,
    trim : true,
    default : "https://i.ibb.co/nbYsmJB/xflix.jpg"
  },
  votes: {
    upVotes: {
      type: Number,
      default: 0,
      required : true
    },
    downVotes: {
      type: Number,
      default: 0,
      required : true
    },
  },
  viewCount: {
    type: Number,
    default: 0,
    required : true
  },
});
const videos = mongoose.model("video", videoSchema);

module.exports = videos;
