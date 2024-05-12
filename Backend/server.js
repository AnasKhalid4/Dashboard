const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const route = require("./routes/routes")

dotenv.config();  
const app = express();
app.use(express.json({ extended: true }));
     
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

mongoose  
  .connect(
    "mongodb+srv://anaskhalid:anaskhalid3535@anas.wvrmz4q.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )   
  .then(() => {
    console.log("Database Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });
  
app.use(
  cors({   
    origin: ["http://localhost:5173"],
    method: ["GET", "POST"],
    credentials: true,
  })
);
   
  
      

app.get("/", (req, res) => {
    res.send({
      message: "welcome to dashboard ",
    });   
  });       

 
app.use("/api",route)

  const PORT =5000; 
app.listen(PORT, () => {
  console.log("Server started on 5000 Port ");
});    