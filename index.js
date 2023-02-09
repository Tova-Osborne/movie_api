const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const uuid = require("uuidv4");

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

let users = [
  {
    id: 1,
    name: "Joe Smith",
    favorites: [],
  },
  {
    id: 2,
    name: "Susan Sho",
    favorites: [],
  },
  {
    id: 3,
    name: "Kim Hong",
    favorites: [],
  },
];

let movies = [
  {
    title: "The Shawshank Redemption",
    year: "1994",
    genre: {
      name: "drama",
    },
    director: {
      name: "Frank Darabont",
    },
  },
  {
    title: "Godfather",
    year: 1972,
    genre: {
      name: "drama",
    },
    director: {
      name: "Francis Ford Coppola",
    },
  },
  {
    title: "The Dark Knight",
    year: 2008,
    genre: {
      name: "drama",
    },
    director: {
      name: "",
    },
  },
  {
    title: "The Godfather Part II",
    year: 1974,
    genre: {
      name: "drama",
    },
    director: {
      name: "Francis Ford Coppola",
    },
  },
  {
    title: "12 Angry Men",
    year: 1957,
    genre: {
      name: "drama",
    },
    director: {
      name: "",
    },
  },
  {
    title: "Schindler's List",
    year: 1993,
    genre: {
      name: "drama",
    },
    director: {
      name: "",
    },
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
    genre: {
      name: "drama",
    },
    director: {
      name: "",
    },
  },
  {
    title: "Pulp Fiction",
    year: 1994,
    genre: {
      name: "drama",
    },
    director: {
      name: "",
    },
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    genre: {
      name: "drama",
    },
    director: {
      name: "",
    },
  },
  {
    title: "The Good, the Bad and the Ugly",
    year: 1966,
    genre: {
      name: "drama",
    },
    director: {
      name: "",
    },
  },
];

app.use(bodyParser.json());

app.use(morgan("combined", { stream: accessLogStream }));

//GET request

app.get("/", (req, res) => {
  res.send("Welcome to my movie list app!");
});

//Show all movies list
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

//Show movie detail by title
app.get("/movies/:title", (req, res) => {
  const title = req.params.title;
  const movie = movies.find((movie) => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("movie does not exist");
  }
});

//Show movie details by genre
app.get("/movies/genre/:genreName", (req, res) => {
  const genreName = req.params.genreName;
  const genre = movies.find((movie) => movie.genre.name === genreName).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("genre does not exist");
  }
});

//Show movie details by director name
app.get("/movies/directors/:directorName", (req, res) => {
  const directorName = req.params.directorName;
  const director = movies.find(
    (movie) => movie.director.name === directorName
  ).director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("director does not exist");
  }
});

//Show users list
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

//POST requests

//Add new user
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid;
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("name required");
  }
});

//Add movie to user's favorites list by ID
app.post("/users/:id/:title", (req, res) => {
  const id = req.params.id;
  const title = req.params.title;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favorites.push(title);
    res
      .status(200)
      .send(`${title} has been added to the user ${id}'s favorite list`);
  } else {
    res.status(400).send("user not found");
  }
});

//PUT requests

// update users name by ID
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("user not found");
  }
});

//DELETE requests (remove movies from user's favorites list by ID, remove user)
app.delete("/users/:id/:movieTitle", (req, res) => {
  const id = req.params.id;
  const movieTitle = req.params.movieTitle;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favorites = user.favorites.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(
        `${movieTitle} has been removed from the user ${id}'s favorite list`
      );
  } else {
    res.status(400).send("user not found");
  }
});

//DELETE user by id
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`user ${id} has been deleted.`);
  } else {
    res.status(400).send("user not found");
  }
});

//Show Documentation page from public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
  console.error(err.stack);
});

app.listen(8080, () => {
  console.log("App listening on port 8080.");
});
