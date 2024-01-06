const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./connection/conn.js");

const bookRoute = require("./routers/bookRouter.js");
app.use(cors({
              origint:["https://book-stack-server.vercel.app"],
              methods:["POST","GET","PUT","DELETE"],
              credentials: true,
}
            ));
app.use(express.json());
app.use("/book", bookRoute);
app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(1000, () => {
  console.log("Server Started Successfully");
});
