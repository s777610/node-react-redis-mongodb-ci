const AWS = require("aws-sdk");
const uuid = require("uuid/v1");
const requireLogin = require("../middlewares/requireLogin");
const keys = require("../config/keys");

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  signatureVersion: "v4",
  region: "us-west-1"
});

module.exports = app => {
  app.get("/api/upload", requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;

    // tell aws what file and key aws will receive
    s3.getSignedUrl(
      "putObject",
      {
        Bucket: "scale-blog-bucket",
        ContentType: "image/jpeg",
        Key: key
      },
      // send back pre sign url and key to react
      (err, url) => res.send({ key, url })
    );
  });
};
