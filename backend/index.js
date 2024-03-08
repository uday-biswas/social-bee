const express = require("express");     

const dbconnection = require("./config/database");
const cloudinaryConnect = require("./config/cloudinary");

const userRoutes = require("./routes/user");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const PORT = process.env.PORT_BACKEND || 4001;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
// cloudinary connect
cloudinaryConnect();

// routes
app.use("/api/v1/auth", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});
app.listen(PORT, () => {
  console.log(`server started on port no. ${PORT}`);
});

dbconnection();
