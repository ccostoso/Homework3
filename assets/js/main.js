// Declaring variables

// Declaring game variables
// var wordsArr = ["alienation", "historical", "dialectics", "materialism", "proletariat", "bourgeoisie", "hegemony", "subaltern"];

var wordsArr = [
    {
        name: "alienation",
        hint: "Marx used this word to describe the sense of estrangement from one's labor felt by the proletariat in the capitalist mode of production."
    },
    {
        name: "dialectics",
        hint: "While never used by Hegel himself, this word, commonly associated with Hegelianism, describes the process of thesis-antithesis-synthesis undergone by political and societal structures, and is central to Marxist historiography."
    },
    {
        name: "materialism",
        hint: "The philosophical principle that matter is the primary substance of the universe, and that ideas and consciousness are the by-products of chemical, rathern than spiritual, processes."
    },
    {
        name: "proletariat",
        hint: "In Marxian economics, this class is obliged by necessity to sell their labor to the capitalist class in order to survive."
    },
    {
        name: "bourgeoisie",
        hint: "According to Marx, this class holds the reins of the means of production, and \"creates\" wealth for themselves by paying laborers less than the value of their labor."
    },
    {
        name: "hegemony",
        hint: "In Gramscian thought, a ruling class establishes this through cultural production, making its \"common sense\" and class logic seem self-evident."
    },
    {
        name: "subaltern",
        hint: "Gramsci employs this word to describe the position of the marginalized classes of society."
    }
]
var lettersArr = [];
var chosenWord;
var chosenName = "";
var chosenLetter = "";
var wrongLetters;
var isPlaying = false;
var alphabet = "abcdefghijklmnopqrstuvwxyz";

// Declaring #input-display variables
var inputDisplay = document.getElementById("input-display");
var underscore = "_";
var space = " ";
var underSpace = underscore + space;

// Declaring #hint-display variables
var hintDisplay = document.getElementById("hint-display");

// Declaring #chances-display variables
var chances;
var chanceDisplay = document.getElementById("chance-display");

// Declaring #wrong-display variables
var wrongDisplay = document.getElementById("wrong-display");

// Declaring #start-button variable
var startButton = document.getElementById("start-button");

// Game function
startButton.onclick = function() {
    isPlaying = true;
    startButton.disabled = true;
    wrongLetters = [];
    wrongDisplay.innerHTML = "&nbsp;";
    startButton.innerHTML = "Type a letter!";
    chosenWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    chosenName = chosenWord.name;
    chosenHint = chosenWord.hint;
    chances = Math.floor(chosenName.length * .75);
    underSpaces = underSpace.repeat(chosenName.length);
    inputDisplay.innerHTML = underSpaces;
    inputDisplay.style.color = "#24292d";
    hintDisplay.innerHTML = chosenHint;
    chanceDisplay.innerHTML = chances;
    console.log("chosenName", chosenName);

    // Step 1: Input letters.
    document.onkeyup = function(event) {
        if (
            isPlaying
            &&
            alphabet.includes(event.key)
        ) {
            lettersArr = chosenName.split("");
            chosenLetter = event.key;
            console.log("chosenLetter", chosenLetter);
    
            var correct = false;
    
            
            // Step 2.1: Iterate over an array of chosenName's letters to see if input character is in chosenName.
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

            // Step 3.2: If letter is not in word, push the letter into an array of wrongLetters; if letter is not already is array,add letter to wrongDisplay box on page and lower chances by one.
            if (
                !correct
                &&
                wrongLetters.indexOf(chosenLetter) === -1
                ) {
                wrongLetters.push(chosenLetter);
                wrongDisplay.innerHTML += chosenLetter.toUpperCase() + " ";
                console.log("wrongLetters", wrongLetters);
                chances--;
                chanceDisplay.innerHTML = chances;
            } else {
                console.log("wrongLetters", wrongLetters);
            }

            // Step 4. Reset correct variable for next input.
            correct = false;

            // Step 5.1 If player has guessed the word, they win!
            if (underSpaces.indexOf(underSpace) < 0) {
                isPlaying = false;
                inputDisplay.style.color = "green";
                startButton.disabled = false;
                startButton.innerHTML = "You win! Try again?";
            }

            // Step 5.2 If player has no more chances, they lose.
            if (chances === 0) {
                isPlaying = false;
                inputDisplay.innerHTML = lettersArr.join(" ").toUpperCase();
                inputDisplay.style.color = "red";
                startButton.disabled = false;
                startButton.innerHTML = "You lose! Try again?";
            }
        }
    }       
}