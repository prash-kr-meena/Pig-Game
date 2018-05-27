/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, winScore = 100;
var lastDice = -1;

// * for the first time 
resetEverything();

function resetEverything() {

    scores = [0, 0]; // player_0 & player_1
    roundScore = 0;
    activePlayer = 0; // default active player is player_0

    // * show active player on screen to 
    document.querySelector(".player-0-panel").classList.add("active"); // by default 0 is active
    document.querySelector(".player-1-panel").classList.remove("active");


    //? getElementById() is only for id's and is faster then querySelector()
    // * setting defaults in the html : 

    document.getElementById("score-0").textContent = "00";
    document.getElementById("score-1").textContent = "00";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";


    // ! CHANGE THE CSS, using the querySelector
    document.querySelector(".dice").style.display = "none"; //? HIDE dice 

}


// ! EVENTS 
// EVENTS : are notifications that are sent to notify the code, that something happened on the webpage
//          events are triggered by : clicking button, resizing window, scrolling down, or pressing a key

// we can code the event-listners to code the responses, to all these events, like opening up a pop up window, showing animation
// EVENT-LISTNERS : a function that performs an action based on certain event, it waits for a specific event to happen.


// ? addEventListener() is a function with 2 parameter, 
//*  i) the name of the event    
//* ii) the  function that need to be executed on that event, it will be called as soon as the event happens,
//  ?  . .  it will be called by the 
// search for event - reference ; on mdn, or google


//?  now this function can be implemented in many ways, 
//*  i) by an external function 
//* ii) by an anonymous function, (function with no name)

/***

function roll_button_handler() {
    // do some stuff
}

roll_button_handler(); // this is how we call a function 

document.querySelector("btn-roll").addEventListener("click", roll_button_handler); //? here not parameter, as we are not gonna 
//? call the function, instead the eventListner will be calling it as the event happens,
// * and therefore in this case : the   "roll_button_handler "  -> is called as rollback function

*/

//? as we don't need the    "roll_button_handler"   function elsewhere, so making it an external function will not be any usefull so what we can instead do is  create an anonymous function, (so we can't not call it anywhere else as it does not have a name to call upon )



// - - -  newGame - - - - -
document.querySelector(".btn-new").addEventListener("click", function () {
    // set every thing to default 
    resetEverything();

});


// - - -  roll dice - - - - -
document.querySelector(".btn-roll").addEventListener("click", function () {
    // 1. random number
    var dice = Math.floor(Math.random() * 6) + 1;
    console.log("dice  : " + dice);


    // 2. display the dice
    var diceDom = document.querySelector(".dice");
    diceDom.style.display = "block";
    diceDom.src = "dice-" + dice + ".png";


    // ! CHANGE VALUES OF HTML ELEMENTS IN A WEB-PAGE
    // * document.querySelector("#current-0").textContent = dice;
    // * document.querySelector("#current-1").textContent = dice;

    // ? more dynamic
    // document.querySelector("#current-" + activePlayer).textContent = dice;
    // document.querySelector("#current-" + activePlayer).textContent = "<em>" + dice + "<em>";  // ! treat as plain text

    //* method textContent() : is use to change the content of the HTML element, but ONLY PLAIN TEXT, is not html can be passed 
    // ? for that :  we can use innerHTML mthod

    roundScore += dice;

    if (dice === 1) {
        roundScore = 0;

        console.log("in roll Event --> active player : " + activePlayer);
        document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + roundScore + "<em>";

        toggleTheActivePlayer();

    } else if (dice === 6 && lastDice === 6) { // looses its final score : but gets a chance to roll
        scores[activePlayer] = 0;
        roundScore = 0;
        console.log("in roll Event --> active player : " + activePlayer);
        document.querySelector("#score-" + activePlayer).innerHTML = "<b><em>" + scores[activePlayer] + "</em></b>";
        document.querySelector("#current-" + activePlayer).innerHTML = "<b><em>" + roundScore + "</em></b>";

        // toggleTheActivePlayer(); // * no toggeling

    } else {
        console.log("in roll Event --> active player : " + activePlayer);
        document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + roundScore + "<em>";
    }

    // * check before toggling the player : if someone win or not
    if (scores[activePlayer] >= winScore) {
        playerWonTheGame();
    }

    lastDice = dice;
});

function toggleTheActivePlayer() {
    console.log("--> in toggleTheActivePlayer function ");
    console.log("Active player was : " + activePlayer);


    // ! moving and adding css classes, using javaScript eg.

    // *classList have copule methods for , add, remove, and toggle classes
    // document.querySelector(".player-0-panel").classList.remove("active");
    // document.querySelector(".player-1-panel").classList.add("active");

    // * another cool approach, : if present then remove, and if absent then add --> toggle 
    // ? REMEMBER : toggle the both 
    // document.querySelector(".player-0-panel").classList.toggle("active");
    // document.querySelector(".player-1-panel").classList.toggle("active");



    // ? remove "active" class from activePlayer and put it in the non_activePlayer
    // * show this active player in game too
    var non_activePlayer = 1 - activePlayer;
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    document.querySelector(".player-" + non_activePlayer + "-panel").classList.add("active");



    //* and change active player  in JavaScript too
    activePlayer = 1 - activePlayer; // so if 1 was active : 1-1 = 0,  &   if  0 was active then 1-0 = 1

    //? hide the disk if hit 1
    document.querySelector(".dice").style.display = "none";

    console.log("Active player now : " + activePlayer);
}


// - - -  hold - - - - -
document.querySelector(".btn-hold").addEventListener("click", function () {
    console.log("HOLD EVENT FIRED");

    // if hold, add this result to the final score of the active player  and make its round score 0 again
    //   && change the active player

    // ? could have done just this, as   "roundScore"  was already calculated in the roll dice 
    // scores[activePlayer] += roundScore; //* update the final score

    // ! READING VALUES FROM THE WEBPAGE : store them 
    var currentScoreDOM = document.querySelector("#current-" + activePlayer);

    roundScore = currentScoreDOM.textContent; // reading value  and storing
    console.log("Player " + activePlayer + " ->    current-" + activePlayer + "  : " + roundScore);

    // * SET CURRENT-SCORE BACK TO 0
    document.querySelector("#current-" + activePlayer).textContent = "0"; // reading value  and storing


    // NOTE CURRENT SCORE IS a String and not Integer
    scores[activePlayer] += parseInt(roundScore); //* update the final score

    // ! CHANGE VALUES OF HTML ELEMENTS IN A WEB-PAGE
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer] + "";

    roundScore = 0;

    // * check before toggling the player : if someone win or not
    if (scores[activePlayer] >= winScore) {
        playerWonTheGame();
    } else {
        toggleTheActivePlayer();
    }

});

function playerWonTheGame() {
    console.log("player-" + activePlayer + "   won the game"); // in the console

    document.querySelector("#player-name").textContent = "Player-" + (activePlayer + 1); // * first change name then show
    document.querySelector("#player-won").style.display = "block";

    // new-btn-modal is visible now
}


// = = =  new-btn-modal as class = = = 

document.querySelector(".new-btn-modal").addEventListener("click", function () {
    console.log("start a new game");

    document.querySelector("#player-won").style.display = "none";
    resetEverything();
})