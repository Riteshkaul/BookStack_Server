const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://riteshkaul682:qNG9UnY1Fmh604m1@cluster0.g8nvsw5.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connected"));
