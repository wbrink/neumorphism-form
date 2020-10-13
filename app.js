// Fisher-Yates shuffle (take an array and pick random index based on the length of the array then remove that element to avoid  )
function shuffle(array) {
  let copy = [];
  let value;

  while(array.length > 0) {
    value = Math.floor(Math.random() * array.length)
    copy.push(array.splice(value, 1)); // pushes the value to our new array from the splice which removes the value from the original array
  }

  return copy;
}


// get random number
function getRandomInteger(min,max) {
  return Math.floor(Math.random() * (max-min + 1)) + min; // taken from w3 schools
}





// create map object to handle scrabble calculations
const scrabbleMap = new Map();
scrabbleMap.set('a', 1);
scrabbleMap.set('b', 3);
scrabbleMap.set('c', 3);
scrabbleMap.set('d', 2);
scrabbleMap.set('e', 1);
scrabbleMap.set('f', 4);
scrabbleMap.set('g', 2);
scrabbleMap.set('h', 4);
scrabbleMap.set('i', 1);
scrabbleMap.set('j', 8);
scrabbleMap.set('k', 5);
scrabbleMap.set('l', 1);
scrabbleMap.set('m', 3);
scrabbleMap.set('n', 1);
scrabbleMap.set('o', 1);
scrabbleMap.set('p', 3);
scrabbleMap.set('q', 10);
scrabbleMap.set('r', 1);
scrabbleMap.set('s', 1);
scrabbleMap.set('t', 1);
scrabbleMap.set('u', 1);
scrabbleMap.set('v', 4);
scrabbleMap.set('w', 4);
scrabbleMap.set('x', 8);
scrabbleMap.set('y', 4);
scrabbleMap.set('z', 10);

// console.log(shuffle([0,1,2,3,4,5,6]));
const form = document.querySelector(".form");
const team1Score = document.querySelector("#team1Score");
const team2Score = document.querySelector("#team2Score"); 
const team1Input = document.querySelector("#team1Input");
const team2Input = document.querySelector("#team2Input");
const spreadInput = document.querySelector("#spread");
const spreadResult = document.querySelector("#spreadResult");
const winner = document.querySelector("#winner");
const submitButton = document.querySelector("#submitButton");
const rankings = document.querySelector("#rankings");
// const nextSection = document.querySelector("#completelyRandomSection");
const scrabbleSection = document.querySelector(".scrabble");
const randomSection = document.querySelector("#randomSection");
const generateRandomButton = document.querySelector("#generateRandomIntButton");
const rankings2 = document.querySelector("#rankings2");
const randIntResult = document.querySelector("#randIntResult");
const randStartNumber = document.querySelector("#startingNumber");
const randEndNumber = document.querySelector("#endingNumber");
const scrabbleNavBtn = document.querySelector("#scrabbleNav");
const randomNavBtn = document.querySelector("#randomNav");
// set the rankings
const randomRanking = shuffle([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
rankings.innerHTML = randomRanking;
rankings2.innerHTML = randomRanking;


randomNavBtn.addEventListener("click", function(e) {
  scrabbleSection.style.opacity = "0";
  randomSection.style.opacity = "1";
  setTimeout(() => {
    scrabbleSection.classList.add("hide"); // give it time to finish the opacity animation
    randomSection.classList.remove("hide");
  }, 200)
  
  // navbar 
  this.classList.remove("non-active-nav");
  this.classList.add("active-nav");

  scrabbleNavBtn.classList.remove("active-nav");
  scrabbleNavBtn.classList.add("non-active-nav");
})

scrabbleNavBtn.addEventListener("click", function(e) {
  randomSection.style.opacity = "0";
  scrabbleSection.style.opacity = "1";
  setTimeout(() => {
    randomSection.classList.add("hide"); // give it time to finish the opacity animation
    scrabbleSection.classList.remove("hide");
    
  }, 200)
  
  this.classList.remove("non-active-nav");
  this.classList.add("active-nav");

  randomNavBtn.classList.remove("active-nav");
  randomNavBtn.classList.add("non-active-nav");
})


// prevent the form from being submitted
form.addEventListener("submit", (e) => e.preventDefault());

generateRandomButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (randStartNumber.value == "" || randEndNumber.value == "") {
    console.log("you suck play theh game");
  }
  const num = getRandomInteger(parseInt(randStartNumber.value), parseInt(randEndNumber.value))
  randIntResult.textContent = num;
  
  
})

// handle submit for the button
submitButton.addEventListener("click", handleSubmit);
function handleSubmit(e) {
  let spread;
  spreadInput.value === "" ? spread = 0 : spread = parseInt(spreadInput.value);

  if (spread > 100 || spread < -100) {
    return;
  }
  spreadResult.innerHTML = spread; // see the spread in the results section
  const firstTeamScore = parseWord(team1Input.value.toLowerCase()) // team 1 score
  const secondTeamScore = parseWord(team2Input.value.toLowerCase()); // team 2 score
  
  // add the spread to the second teams score
  const secondTeamsScoreAdjusted = secondTeamScore + spread;
  console.log(secondTeamsScoreAdjusted);
  // see who won
  if (firstTeamScore > secondTeamsScoreAdjusted) {
    winner.innerHTML = team1Input.value;
  } else if (firstTeamScore < secondTeamsScoreAdjusted) {
    winner.innerHTML = team2Input.value;
  } else {
    winner.innerHTML = "tie";
  }

  team1Score.innerHTML = firstTeamScore;
  team2Score.innerHTML = secondTeamScore;


}

// send word with no whitepace, returns the score (type integer);
function parseWord(word) {
  let score = 0;
  const wordArray = word.split("");
  wordArray.forEach(letter => {
    score = score + scrabbleMap.get(letter);    
  });
  return score;
}


// prevent whitespace in input
team1Input.addEventListener('keypress', preventWhiteSpace);
team2Input.addEventListener("keypress", preventWhiteSpace);
function preventWhiteSpace(e) {
  if (e.keyCode === 32) {
    e.preventDefault();
  }
}


nextSection.addEventListener("click", () => {
  scrabbleSection.style.opacity = "0";
  setTimeout(() => {
    scrabbleSection.style.display = "none"; // give it time to finish the opacity animation
    randomSection.classList.remove("hide");
  }, 200)
  

  
  // scrabbleSection.style.opacity = "0";
  
})



