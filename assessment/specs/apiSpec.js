import api from "../pages/api";

describe("Search", () => {
  beforeEach(() => {});

  it("upload 10 videos and verify that 10 videos are available on the platform ", () => {
    cy.readFile("api-video.json").then((videoConfigs) => {
      cy.log(videoConfigs);
      videoConfigs.forEach((config) => {
        let response = api.uploadNewVideo(
          config.link,
          config.title,
          config.genre,
          config.contentRating,
          config.releaseDate,
          config.image
        );
        response
          .its("body")
          .should("to.have.all.keys", [
            "contentRating",
            "genre",
            "id",
            "previewImage",
            "releaseDate",
            "title",
            "videoLink",
            "viewCount",
            "votes",
          ]);
      });
    });
  });

  it("Verify that we have all fifteen videos available in the search ", () => {
    let response = api.getAllVideos();
    response.its("body.videos").should("to.have.length.of.at.least", 15);
  });

  it("Verify that we have only one video with title = video18 and Its genre is Education", () => {
    let response = api.getVideoByTitle("video18");
    response
      .its("body.videos")
      .its(0) //0th element
      .its("genre")
      .should("to.be.equal", "Education");
  });

  it("Verify at least 2 videos are available for sports", () => {
    let response = api.getVideoByGenre("Sports");
    response.its("body.videos").should("have.length.of.at.least", 2);
  });

  it("Verify that we have only one video with contentrating = 18+", () => {
    let response = api.getVideoByContentRating("18%2B");
    response
      .its("body.videos")
      .its(0) //0th element
      .its("genre")
      .should("to.be.equal", "Education");
  });

  it("Verify that we have only one vide owith title = video18 ", () => {
    let response = api.getVideoByTitle("video18");
    response
      .its("body.videos")
      .its(0) //0th element
      .its("genre")
      .should("to.be.equal", "Education");
  });

  it("Verify that video with title First-Video indeed comes first when sorted by releaseDate ", () => {
    let response = api.getAllVideosSortByReleaseDate();
    response
      .its("body.videos")
      .its(0) //0th element
      .its("title")
      .should("to.be.equal", "First-Video");
  });

  it("Try to upvote a video and make sure that it actually reflects", () => {
    let response = api.getAllVideos();
    response
      .its("body.videos")
      .its(1)
      .then((video) => {
        api.upvote(video.id).then(() => {
          api
            .getVideoById(video.id)
            .its("body.votes.upVotes")
            .should("to.be.greaterThan", 0);
        });
      });
  });

  it("Try to downvote a video and make sure that it actually reflects", () => {
    let response = api.getAllVideos();
    response
      .its("body.videos")
      .its(1)
      .then((video) => {
        api.downVote(video.id).then(() => {
          api
            .getVideoById(video.id)
            .its("body.votes.downVotes")
            .should("to.be.greaterThan", 0);
        });
      });
  });

  it("should increment video view count on calling the /videos/:videoId/views endpoint", () => {
    let response = api.getAllVideos();
    response
      .its("body.videos")
      .its(1)
      .then((video) => {
        api.incrementViewCount(video.id).then(() => {
          api
            .getVideoById(video.id)
            .its("body.viewCount")
            .should("to.be.greaterThan", 0);
        });
      });
  });
});

