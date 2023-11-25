// import module
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

require("dotenv").config();

const app = express();
app.use(cors());

// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

// middleware
app.use(express.static("views"));
// app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => app.listen(process.env.PORT || 3010))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);

// app.get("/", (req, res) => res.render("home"));
// app.get("/", requireAuth, (req, res) => res.render("home"));
app.get("/signup", (req, res) => res.render("signup"));
app.get("/data", requireAuth, (req, res) => res.render("data"));
app.get("/data/pemeriksaan", requireAuth, (req, res) =>
  res.render("dataPemeriksaan")
);
app.get("/data/view", requireAuth, (req, res) => res.render("detailData"));

app.use(authRoutes);
