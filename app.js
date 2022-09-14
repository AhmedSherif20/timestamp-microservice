const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/api/:date?", (req, res, next) => {
  let { date } = req.params;
  let dateString;

  //check if date come or no
  if (date) {
    const checkUnix = date * 1;
    dateString = isNaN(checkUnix) ? new Date(date) : new Date(checkUnix);
  } else {
    //* if date param don't have value
    dateString = new Date();
  }

  //check if valid format
  if (dateString.isValid()) {
    const unix = dateString.getTime();
    const utc = dateString.toUTCString();
    res.json({ unix, utc });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// adding custom global checking date function
Date.prototype.isValid = function () {
  // If the date object is invalid it
  // will return 'NaN' on getTime()
  // and NaN is never equal to itself.
  return this.getTime() === this.getTime();
};
