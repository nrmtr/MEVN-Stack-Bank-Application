require("dotenv").config();

const express = require("express");
const connectDB = require("./config/dbcon");
const cors = require("cors");
const corsOptions = require("./config/cors");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
const morgan = require("morgan");
const loginController = require("./controllers/authenControllers");
const errorHandler = require("./middleware/error_handler");
const authMiddleware = require("./middleware/authMiddleware");
const credentials = require("./middleware/credentials");
const port = process.env.PORT || 3000;

connectDB();

//credentials
app.use(credentials);

//cors
app.use(cors(corsOptions));

//middleware
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);

//routers

app.use("/api", require("./routes/authenRoute"));
app.use("/transaction",require("./routes/transactionRoute"))

// error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
