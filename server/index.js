const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
// midleware
app.use(express.json()); //req.body
app.use(cors());

//ROUTES//

// Register and login routes

app.use("/auth", require("./Routes/jwtAuth.js"));

// dashboard route
app.use("/dashboard", require("./Routes/dashboard.js"));

app.listen(5000, () => {
  console.log("server is runing on 5000");
});
