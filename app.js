const express = require("express");
const app = express();

app.use(express.urlencoded());
app.set('view engine', 'pug');
app.set('views', 'views');
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  let inputNumber = req.body.number;  
  res.render('index', {inputNumber});  
});

app.listen(3000, () => console.log('Listening on port 3000!'));