// Declaring variables

// Declaring game variables
var wordsArr = ["hello", "alienation", "historical", "dialectics", "materialism", "proletariat", "bourgeoisie"];
var lettersArr = [];
var chosenWord = "";
var chosenLetter = "";
var wrongLetters;
var isPlaying = false;

// Declaring #chances-display variables
var chances;
var chanceDisplay = document.getElementById("chance-display");

// Declaring #input-display variables
var inputDisplay = document.getElementById("input-display");
var underscore = "_";
var space = " ";
var underSpace = underscore + space;

// Declaring #wrong-display variables
var wrongDisplay = document.getElementById("wrong-display");

// Declaring #start-button variable
var startButton = document.getElementById("start-button");

// Game function
startButton.onclick = function() {
    isPlaying = true;
    startButton.disabled = true;
    wrongLetters = [];
    startButton.innerHTML = "Type a letter!";
    chosenWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    chances = Math.floor(chosenWord.length * 1.25);
    underSpaces = underSpace.repeat(chosenWord.length);
    inputDisplay.innerHTML = underSpaces;
    chanceDisplay.innerHTML = chances;
    console.log("chosenWord", chosenWord);

    // Step 1: Input letters.
    document.onkeyup = function(event) {
        if (isPlaying === true) {
            lettersArr = chosenWord.split("");
            chosenLetter = event.key;
            console.log("chosenLetter", chosenLetter);
    
            var correct = false;
    
            
            // Step 2.1: Iterate over an array of chosenWord's letters to see if input character is in chosenWord.
            for (var i = 0; i < lettersArr.length; i++) {
                if (chosenLetter === lettersArr[i]) {
                    var underSpacesArr = underSpaces.split("");
                    underSpacesArr[(i * 2)] = chosenLetter.toUpperCase();
                    underSpaces = underSpacesArr.join("");
                    console.log(underSpaces);
                    inputDisplay.innerHTML = underSpaces;
                    correct = true;
                }
            }
    
            console.log("correct?", correct)
    
            // Step 3.1: If not, chances should go down by one.
            if (isPlaying && !correct) {
                chances--;
                chanceDisplay.innerHTML = chances;
            }

            // Step 3.2: If letter is not in word, push the letter into an array of wrongLetters and if letter is not already is array, add letter to wrongDisplay box on page.
            if (
                (!correct)
                &&
                (wrongLetters.indexOf(chosenLetter) === -1)
                ) {
                wrongLetters.push(chosenLetter);
                wrongDisplay.innerHTML += chosenLetter.toUpperCase();
                console.log("wrongLetters", wrongLetters);
            } else {
                console.log("wrongLetters", wrongLetters);
            }

            // Step 4. Reset correct variable for next input.
            correct = false;

            // Step 5.1 If player has guessed the word, they win!
            if (underSpaces.indexOf(underSpace) < 0) {
                isPlaying = false;
                startButton.disabled = false;
                startButton.innerHTML = "You win! Try again?";
            }

            // Step 5.2 If player has no more chances, they lose.
            if (chances === 0) {
                isPlaying = false;
                startButton.disabled = false;
                startButton.innerHTML = "You lose! Try again?";
            }
        }
    }       
}