// Globala variabler

// Lista med spelets alla ord
var wordList = [
  "hello",
  "sunshine",
  "moon",
  "venus",
  "earth",
  "sunray",
  "galaxy",
  "universe",
  "mars",
  "rainforest",
  "planet",
  "ocean",
  "country",
  "computer",
  "science",
  "travel",
  "goodbye",
  "words",
  "academy",
  "tesla",
  "frame",
  "cosmic"
];

// Ett av orden valt av en slumpgenerator
var selectedWord;

//Rutorna där bokstäverna ska stå
var letterBoxes;

// Vilken av bilderna som kommer upp beroende på hur många fel du gjort
var hangmanImgNr;

// Ger meddelande när spelet är över
var msgElem;

// Knappen du startar spelet med
var startGameBtn;

// Knapparna för bokstäverna
var letterButtons;


// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
  startGameBtn = document.querySelector("#startGameBtn");
  msgElem = document.querySelector('#message'); 
  startGameBtn.addEventListener("click", startGame);

  letterButtons = document.querySelectorAll("#letterButtons button");
  for (var i = 0; i < letterButtons.length; i++) {
    letterButtons[i].addEventListener("click", guessLetter);  
  }
  inactivateLetterButtons();  
  
} // End init

window.onload = init; // Se till att init aktiveras då sidan är inladdad

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
function startGame() {
  hangmanImgNr = 0;
  pickRandomWord();
  createLetterBoxes(selectedWord.length);
  activateLetterButtons(); 
  startHangmanImg();
  removeMessage();
}

// Funktion som slumpar fram ett ord 
/* Efter att funktionen har körts, har den globala variablen "selectedWord" fått ett nytt slumpmässigt 
value utifrån det som finns i wordList */
function pickRandomWord() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];

}

// Funktionen som tar fram bokstävernas rutor, antal beror på vilket ord
/* numberOfBoxes bestämmer hur många "boxar" som skapas i spelet och boxarna läggs i letterBoxes ul */
function createLetterBoxes(numberOfBoxes) {
  var oneBox = ' <li><input type="text" disabled value="&nbsp;" /></li>';

  var result = "";
  for (var i = 0; i < numberOfBoxes; i++) {
    result = result + oneBox;
  }

  document.querySelector("#letterBoxes ul").innerHTML = result;
  letterBoxes = document.querySelectorAll("#letterBoxes input");
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
/* this är button elementet som tryckts när funktionen guessLetter anropas. */

function guessLetter() {
  var guessedLetter = this.value; 
  var letterFoundInWord = false; 

  for (var i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i].toUpperCase() === guessedLetter.toUpperCase()) {
      letterFoundInWord = true;
      showLetterInBox(guessedLetter, i);
    }
  }
  this.disabled = true;
  
  if (letterFoundInWord) {
    guessedRight();
  } else {
    guessedWrong(); 
  }
}

function showLetterInBox(letter, letterPosition) {
  letterBoxes[letterPosition].value = letter;
}


function guessedRight() {
  
  var wonGame = true;

  //om bokstäverna i boxen inte stämmer överens med ordet som sökes så har man ej vunnit spelet än.
  for (var i = 0 ; i < letterBoxes.length ; i++) {         
    if(letterBoxes[i].value.toUpperCase() !== selectedWord[i].toUpperCase()) {
      wonGame = false;
    }
  }

  if(wonGame) {
    displayGameWonMessage(); 
    inactivateLetterButtons();
  }
}


/* Funktionen guressedWrong kontrollerar antal fel gissningar. Varje gång man gissar fel, visas
en ny del av bild av hangman. När man har gissat fel mer än 6 ggr har man förlorat och ett meddelande visas 
om förlust.*/

function guessedWrong() {
  hangmanImgNr++;

  if (hangmanImgNr < 7) {;

    document.querySelector('#hangman').src ='images/h' + hangmanImgNr + '.png';
  }
  
  if (hangmanImgNr === 6) {
    displayGameLostMessage(); 
    inactivateLetterButtons(); 
  }

}

/* Meddelar om förlust */ 
function displayGameLostMessage() {
  var messageLost = '<p>Oh nej! Du hängde gubben! Spela igen och rädda honom!</p>'; 
  msgElem.innerHTML = messageLost; 
}

/* Meddelar om vinst */
function displayGameWonMessage() {
  var messageWon = '<p>Grymt jobbat! Du räddade gubben! Spela igen!</p>'; 
  msgElem.innerHTML = messageWon; 
}

/* funktion som tar bort meddelande vid start av spel */
function removeMessage() {
  msgElem.innerHTML = '';
  
}

// Funktionen ropas vid vinst eller förlust, gör olika saker beroende av det
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på

function inactivateLetterButtons() {
   
  for (var i = 0; i < letterButtons.length; i++ ) {
    letterButtons[i].disabled = true; 
  }
}

function activateLetterButtons() {
  
 for (var i = 0; i < letterButtons.length; i++ ) {
   letterButtons[i].disabled = false; 
 }
}

/* funktion som sätter tillbaka startbilden vid ny spel */
function startHangmanImg() {
    document.querySelector('#hangman').src ='images/h0.png';    
}
  
