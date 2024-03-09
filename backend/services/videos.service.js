const videos = require("../Model/videos.model");

class VideosService {
  findAll = async () => {
    const result = await videos.find({});
    return result;
  };

  create = async (video) => {
    const newVideo = new videos({ ...video });
    return await newVideo.save();
  };

  findByTitle = async (title) => {
    const result = await videos.find({
      title: { $regex: title, $options: "i" },
    });
    return result;
  };

  findByGenres = async (genre) => {
    const genreArray = genre.split(",");
    const result = await videos.find({ genre: { $in: genreArray } });
    return result;
  };

  findByContentRating = async (contentRating) => {
    const result = await videos.find({ contentRating: contentRating });
    return result;
  };

  findByCriteria = async (title, genre, contentRating) => {
    const query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (genre) {
      const genreArray = genre.split(",");
      query.genre = { $in: genreArray };
    }

    if (contentRating) {
      query.contentRating = { $lte: contentRating };
    }

    const result = await videos.find(query);
    return result;
  };

  sortBydecreasingOrder = async (sortBy) => {
    const sortOption = this.constructSortOption(sortBy);
    const result = await videos.find({}).sort(sortOption);
    return result;
  };

  constructSortOption(sortBy) {
    let sortOption = {};

    // Sort by viewCount in descending order :
    if (sortBy === "viewCount") {
      sortOption = { viewCount: -1 };
    }
    // Sort by releaseDate in descending order :
    else if (sortBy === "releaseDate") {
      sortOption = { releaseDate: -1 };
    }

    return sortOption;
  }

  findById = async (id) => {
    const result = await videos.findById(id);
    return result;
  };

  update = async (id, vote, change) => {
    const filter = { _id: id };

    const update = {};

    if (vote === "upVote" && change === "increase") {
      update.$inc = { "votes.upVotes": 1 };
    } else if (vote === "upVote" && change === "decrease") {
      update.$inc = { "votes.upVotes": -1 };
    } else if (vote === "downVote" && change === "increase") {
      update.$inc = { "votes.downVotes": 1 };
    } else if (vote === "downVote" && change === "decrease") {
      update.$inc = { "votes.downVotes": -1 };
    } else {
      throw new Error("Invalid vote or change value");
    }

    const options = { new: true };

    const result = await videos.findOneAndUpdate(filter, update, options);

    if (!result) {
      throw new Error(`Video with id ${id} not found`);
    }

    return result;
  };

  updateViewCount = async (id) => {
    const filter = { _id: id };
    const update = { $inc: { viewCount: 1 } };
    const options = { new: true };

    const result = await videos.findOneAndUpdate(filter, update, options);

    if (!result) {
      throw new Error(`Video with id ${id} not found`);
    }

    return result;
  };
}

module.exports = VideosService;
