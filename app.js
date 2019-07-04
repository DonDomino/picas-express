const express = require("express");
const app = express();
const cookieSession = require('cookie-session');

const generateNumber = () => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const shuffle = arr => {
  arr.sort(() => Math.random() - 0.5);
  }
  shuffle(nums);
  return nums.slice(0, 4).join("");
}

const setValues = (random, userNum) => {
  let picas = 0, fijas = 0;    
  for(let i=0;i<random.length;i++){
    for(let j=0;j<userNum.length;j++){
      if(random[i]===userNum[j]&&i===j){
        fijas++;
      } else if(random[i]===userNum[j]){
        picas++;
      }
    } 
  }  
  return [picas, fijas];
}

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.urlencoded());
app.use(cookieSession({
  secret: 'barranquilla inmortal',
  maxAge:  3* 60 * 1000,
}));

app.get("/", (req, res) => {
  req.session.random = generateNumber();
  console.log(req.session.random);
  res.render("index");
});

app.post("/", (req, res) => {
  let inputNumber = req.body.number;  
  req.session.compare = setValues(req.session.random, inputNumber);
  let result = req.session.compare;
  res.render('index', {inputNumber, result});  
});

app.listen(3000, () => console.log('Listening on port 3000!'));