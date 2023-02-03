const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

var top10Movies = [
  {
    Title: "The Shawshank Redemption",
    Year: 1994,
  },
  {
    Title: "The Godfather",
    Year: 1972,
  },
  {
    Title: "The Dark Knight",
    Year: 2008,
  },
  {
    Title: "The Godfather Part II",
    Year: 1974,
  },
  {
    Title: "12 Angry Men",
    Year: 1957,
  },
  {
    Title: "Schindler's List",
    Year: 1993,
  },
  {
    Title: "The Lord of the Rings: The Return of the King",
    Year: 2003,
  },
  {
    Title: "Pulp Fiction",
    Year: 1994,
  },
  {
    Title: "The Lord of the Rings: The Fellowship of the Ring",
    Year: 2001,
  },
  {
    Title: "The Good, the Bad and the Ugly",
    Year: 1966,
  },
];

app.use(morgan("combined", { stream: accessLogStream }));

app.get("/", (req, res) => {
  res.send("Welcome to my movie list app!");
});

app.get("/movies", (req, res) => {
  res.json(top10Movies);
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
});

app.listen(8080, () => {
  console.log("App listening on port 8080.");
});
