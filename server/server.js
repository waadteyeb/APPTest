const express = require("express");
const cors = require("cors");
const path = require('path');

const app = express();
app.use("/assets", express.static(path.join(__dirname, 'assets')));
app.use(express.json());
var corsOptions = {
  origin: "http://localhost:3000", // my front end url
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable cookies and session handling
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
const db = require("./models");


require('./routes/spendings.routes')(app);




db.sequelize.sync();



// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to spendings application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});