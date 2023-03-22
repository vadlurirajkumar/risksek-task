const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb+srv://test:test@project.tbl9oik.mongodb.net/test")
  .then(() => {
    console.log(`db connected`);
  })
  .catch((err) => {
    console.log(err);
  });