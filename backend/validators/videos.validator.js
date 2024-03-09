const Joi = require("joi");

const videosValidationSchema = Joi.object().keys({
  videoLink: Joi.string()
    .regex(/youtube\.com\/embed\/[a-zA-Z0-9_-]+/)
    .required(),
  title: Joi.string().required(),
  genre: Joi.string()
    .valid("Education", "Sports", "Movies", "Comedy", "Lifestyle", "All")
    .required(),
  contentRating: Joi.string()
    .valid("Anyone", "7+", "12+", "16+", "18+")
    .required(),
  releaseDate: Joi.string().required(),
  previewImage: Joi.string().uri().required(),
});

const votesValidationSchema = Joi.object().keys({
  vote: Joi.string().required(),
  change: Joi.string().required(),
});

module.exports = { videosValidationSchema, votesValidationSchema };
