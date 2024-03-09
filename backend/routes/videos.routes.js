const router = require("express").Router();

const {
  getAllVideos,
  getVideoById,
  postVideo,
  updateVotes,
  updateViews,
} = require("../controllers/videos.controller");

const { validateSchema } = require("../middlewares/videos.middleware");
const {
  videosValidationSchema,
  votesValidationSchema,
} = require("../validators/videos.validator");

const videosMiddleware = validateSchema(videosValidationSchema);
const votesMiddleware = validateSchema(votesValidationSchema);

// Routes :

router.get("/videos", getAllVideos);
router.get("/videos/:id", getVideoById);
router.post("/videos", videosMiddleware, postVideo);
router.patch("/videos/:id/votes", votesMiddleware, updateVotes);
router.patch("/videos/:id/views", updateViews);

module.exports = router;
