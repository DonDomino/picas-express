const express = require("express");
const app = express();

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

let inputNumber = "";
let toGuess = generateNumber();
let compare = [0,0];
console.log(toGuess);

app.use(express.urlencoded());
app.set('view engine', 'pug');
app.set('views', 'views');
app.get("/", (req, res) => {
  res.render("index", {compare});
});

app.post("/", (req, res) => {
  inputNumber = req.body.number;  
  compare = setValues(toGuess, inputNumber);
  res.render('index', {inputNumber, compare});  
});

app.listen(3000, () => console.log('Listening on port 3000!'));