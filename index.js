const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

require("./models/User"); // define user model first
require("./models/Blog");
require("./services/passport");
require("./services/cache");

mongoose.Promise = global.Promise;
mongoose.connect(
  keys.mongoURI,
  { useMongoClient: true }
);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // unique in my app,
    // cookieKey + session signature = Base64 Session
    // used for making sure the Session isn't tampered
    // and used for generate session signature
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/blogRoutes")(app);

// production
if (["production", "ci"].includes(process.env.NODE_ENV)) {
  app.use(express.static("client/build"));

  //express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
