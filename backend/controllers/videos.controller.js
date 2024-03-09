const VideosService = require("../services/videos.service");
const VideosServiceInstance = new VideosService();

const getAllVideos = async (request, response) => {
  let videos;

  if (
    request.query.title &&
    request.query.genres &&
    request.query.contentRating
  ) {
    videos = await VideosServiceInstance.findByCriteria(
      request.query.title,
      request.query.genres,
      request.query.contentRating
    );
  } // Find By title, if title is present :
  else if (request.query.title) {
    videos = await VideosServiceInstance.findByTitle(request.query.title);
  }

  // Find By genres, if genres is present :
  else if (request.query.genres) {
    if (request.query.genres === "All") {
      videos = await VideosServiceInstance.findAll();
    } else {
      videos = await VideosServiceInstance.findByGenres(request.query.genres);
    }
  }

  // Find By contentRating, if contentRating is present :
  else if (request.query.contentRating) {
    videos = await VideosServiceInstance.findByContentRating(
      request.query.contentRating
    );
  }

  // SortBy descending order of viewCount & releaseDate :
  else if (request.query.sortBy) {
    videos = await VideosServiceInstance.sortBydecreasingOrder(
      request.query.sortBy
    );
  } else {
    videos = await VideosServiceInstance.findAll();
  }

  if (videos.length > 0) {
    response.status(200).json({ videos: videos });
  } else {
    response.status(400).json({ message: "No videos found!" });
  }
};

const getVideoById = async (request, response) => {
  try {
    const { id } = request.params;
    const video = await VideosServiceInstance.findById(id);

    if (video) {
      response.status(200).json(video);
    } else {
      response.status(404).json({
        message: `Video not found! ${id}`,
      });
    }
  } catch (error) {
    response.status(500).json({
      message: `Failed to getVideoById ${error}`,
    });
  }
};

const postVideo = async (request, response) => {
  try {
    const data = request.body;
    const video = await VideosServiceInstance.create(data);

    response.status(201).json(video);
  } catch (error) {
    response.status(400).json({
      message: `Failed to postVideo ${error}`,
    });
  }
};

const updateVotes = async (request, response) => {
  try {
    const { id } = request.params;
    const { vote, change } = request.body;

    const video = await VideosServiceInstance.update(id, vote, change);
    if (video) {
      response.sendStatus(204);
    }
  } catch (error) {
    response.status(500).json({
      message: `Failed to update the votes ${error}`,
    });
  }
};

const updateViews = async (request, response) => {
  try {
    const { id } = request.params;

    const video = await VideosServiceInstance.updateViewCount(id);
    if (video) {
      response.sendStatus(204);
    }
  } catch (error) {
    response.status(400).json({
      message: `Failed to update the viewCount ${error}`,
    });
  }
};

module.exports = {
  getAllVideos,
  getVideoById,
  postVideo,
  updateVotes,
  updateViews,
};
