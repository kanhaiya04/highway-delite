const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Kanhaiya:Coding04@cluster0.gugtlny.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected!"));
