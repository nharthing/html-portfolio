
/*
Glückshaus is a medieval gambling game designed to be played while drinking and talking. 
             
Jenn Dwyer
SDEV 117 T/R 10:00 AM
HTML Pages: Gluckshaus.html
CSS sheet: Gluckshaus.css
JavaScript: gluckshaus.js 

*/

"use strict"; // for more secure code

// *********** INITIAL DECLARATION: ALL THE THINGS ***********
// REQUIREMENTS MET ->
//        At least one javascript variable to hold text or numbers
//        More than one use of javascript comments to document the purpose of certain code blocks or functions


let index = 0; // start of game = index set to 0
let gameOver = false; // start of game = game not over
let playerTurn = "p1"; // initially set to player 1
let dieThrowResult = 0; // start of game = nothing in dice roll since dice haven't been rolled yet
const arrayLen = 13; // length for coinbox - reworked to make this use original dieThrowRoll value.
let hovOver = document.getElementById("hoverElement"); // for troubleshooting purposes


let p1coins = 19; // player 1 total coins is 19 because you have to pay in to coinbox for 7 to play
let p2coins = 19; // player 2 total coins is 19 because you have to pay in to coinbox for 7 to play

// *********** COIN BOXES ***********
// REQUIREMENTS MET ->
//        The use of at least one javascript array, which can be an array of objects
//        At least one javascript loop to iterate over an array, set of objects, or string

let coinbox = []; // <-- array, holds all the coins for various boxes on screen
//console.log("Coinbox when first built: " + coinbox); //for troubleshooting purposes
for (index = 0; index < arrayLen; index++) { // iterate over the array to initialize all coin boxes to 0 coins
    coinbox[index] = 0;
}
coinbox[7] = 2; // initialize the coins in box 7, wedding, to one coin in for each player (pay to play)
//console.log("Coinbox is initialized to: " + coinbox); //also for troubleshooting


// *********** POP UP RULES ***************
// REQUIREMENTS MET -> 
//          The use of the javascript Browser Object Model to open a browser window or use alert, a timer, or cookies

// Pop up the rules into another window for the users. (They never scroll down anyway; I know I don't.)


let newWindow = window.open("about:blank", "_blank", "top=200,left=500,width=600,height=500"); // define new window

if (newWindow) { // if the new window is initialized properly
    newWindow.document.write("<p>THE RULES</p>"); // then write out the rules for them on a popup screen
    newWindow.document.write("<p>A Player who wants to join the game must place a coin onto the number 7.</p>");
    newWindow.document.write("<p>One Player after another throws the two six-sided dice:</p>\
    <p>If they throw a 12, they are KING and WIN THE GAME plus ALL THE COINS ON THE BOARD!</p>\
    <p>If they throw a 7, they are a WEDDING GUEST and have to bring gift for \"dowry\": a coin for number 7.</p>\
    <p>If they throw a 2, they are the LUCKY PIG and can take all the coins on the board EXCEPT for number 7.</p>\
    <p>If they throw a 4, absolutely nothing happens--there is no number 4 on the board. It's like a lost turn.<p>\
    <p>If they throw any other number, they have to put a coin onto the number if it's empty.<br>\
       If it's not empty, they can take the coin(s) that are there!\
    </p>\
    <p>FIRST PLAYER TO BECOME KING WINS!</p>");
    newWindow.document.close(); // define the end of the doc and close out the stream writer
}

// Those instructions are gonna get in the way of play. Let's just pop them up for 15 seconds.
setTimeout(() => {  // the arrow operator! short function syntax. Also allows us to pass through the info to timeout.
    if (newWindow) {
        newWindow.close();
    }
}, 15000);

// This didn't work
//setTimeout(newWindow.close,5000);


// *********** START PLAY SECTION ***********
// REQUIREMENTS MET -> 
//        An HTML form to gather information about users or for any other purpose
//        At least one javascript variable to hold text or numbers

// START OF PLAY FUNCTIONALITY
// We start the play cycle here. The users enter their names, we store the info. When the users enter the info and
// hit "Start Play" button, then the form is hidden and the top of the board shows each player's name, coins,
// and the roll dice button. 
function startPlay() { 

    // get player names
    let p1fname = document.getElementById('p1name').value;
    console.log("Player 1 full name string: " + p1fname);
    console.log("Player 1 first name string: " + p1fname.substring(0, p1fname.indexOf(" ")));

    let p2fname = document.getElementById('p2name').value;
    console.log("Player 2 full name string: " + p2fname);
    console.log("Player 2 first name string: " + p2fname.substring(0, p2fname.indexOf(" ")));

    
    let p1name1 = document.getElementById('p1name').innerHTML = document.getElementById('p1name').value;
    let p2name2 = document.getElementById('p2name').innerHTML = document.getElementById('p2name').value; 
    

    
    // hide the first two forms - should be player1form and player2form, and hide the PLAYER ROLL button
    document.forms[0].style.display = "none";
    document.forms[1].style.display = "none";

    // hide the Start Play button
    //https://stackoverflow.com/questions/8685107/hiding-a-button-in-javascript
    document.getElementById('startPlay').style.visibility = 'hidden';
    
    document.getElementsByClassName('')
    
    // show the Players heading with updated values
    // update value of p1name, p2name, p1coins, p2coins
    document.querySelector('.player-heading').style.display = 'flex';

    //p1n, p1coins
    document.getElementById('p1n').innerHTML = p1name1;
    document.getElementById('p1coins').innerHTML = p1coins;

    //p2n, p2coins
    document.getElementById('p2n').innerHTML = p2name2;
    document.getElementById('p2coins').innerHTML = p2coins;

    document.getElementById('coinbox7').innerHTML = coinbox[7];

    //rollDice - update button verbiage to "playerTurn, ROLL" - starts as P1
    document.getElementById('playerTurn').innerHTML = playerTurn;

    // visibility toggling for the rollDice button
    document.getElementById('rollDice').style.visibility = 'visible';

}

// TEST AREA
// Just using the mouseover for testing purposes, pay him no mind now.
/************* mouseover for testing *****/
hovOver.addEventListener("mouseover", function() {
    //alert("Mouse is over the element! This means successful event handling.");
    //chkGameOver();
    //throwDice();
    }
);


// *********** DO THE THINGS ***********
// REQUIREMENTS MET ->
//       The use of at least one javascript array, which can be an array of objects
//       The use of at least one javascript function
//       At least one selection statement such as if or switch

// HERE BE DRAGONS
// Once the user has gotten this far, they get to "throw the dice".
// The bulk of game play happens once the dice are rolled.
// We check first to make absolutely sure someone didn't just win the game, such as if coins are zero.
// more comments go here
// 
function throwDice() {
    chkGameOver(); // let's make sure the game isn't actually over already

    dieThrowResult = 0; //clear the result each time for dieThrowResult 
    for (let i = 0; i < 2; i++) { // roll 2 dice, add both to dieThrowResult
         dieThrowResult += Math.floor(Math.random() * 6) + 1; 
    } 
    //document.getElementById('addCoin').innerHTML = "ADD COIN TO " + dieThrowResult;

    resultLogic(); // we have our dieThrowResult, let's use it to determine what the player can do
        
    //rollDice id - shows whose turn it is on the Roll button 
    console.log("throwdice player turn: " + playerTurn);
    document.getElementById('playerTurn').innerHTML = playerTurn;
    //document.getElementById('addCoin').innerHTML = "";

} 


// RESULT LOGIC FUNCTION
// Our player has thrown the dice and their Fate has been decided. 
// On a 12 the player wins, so we deal with the win and end the game
// On a 7 a player pays a coin into the dowry. If they have zero coins after then they're out of the game.
// 

function resultLogic() {
       console.log("result is: " + dieThrowResult + " for player " + playerTurn);
       if (!gameOver) {
        switch (dieThrowResult) {
            case 12:
                kingGameOver();                     // on a 12 player wins game by being king
                // don't update the player. We need that info since the current player won.
                break;
            case 7:                                 //  on a 7 add coin to wedding dowry
                alert("You rolled a 7, WEDDING GUEST paid into the DOWRY.")
                addDowry();
                updatePlayerTurn();
                break;
            case 4:                                 // on a 4 player loses a turn
                alert("You rolled a 4, lose a turn.")
                updatePlayerTurn();
                break;
            case 2:                                 // on a 2 player gets all coins except in #7
                alert("LUCKY PIG! You get all the coins except the DOWRY!")
                luckyPig();
                updatePlayerTurn();
                break;
            default:                                // add a coin (mandatory if space empty) or option to take a coin
                console.log("Kicking into normalRollResult with dieThrowResult passed");
                normalRollResult(dieThrowResult);  
        }
    }
       
    document.getElementById('playerTurn').innerHTML = playerTurn;
       
    }


// *********** INITIAL ADD TO DOWRY (7) **********
// each Player has to "pay to play", antes in a coin to the wedding dowry (#7)
function addDowry() {
    if (playerTurn === "p1") {
        p1coins = p1coins - 1;
        document.getElementById('p1coins').innerHTML = p1coins;
        chkGameOver(gameOver);
    } else if (playerTurn === "p2") {
        p2coins = p2coins - 1;
        document.getElementById('p2coins').innerHTML = p2coins;
        chkGameOver(gameOver);
    }
    coinbox[7] += 1;
    document.getElementById('coinbox7').innerHTML = coinbox[7];
}

// ************* LUCKY PIG (2) **************
// Lucky pigs get all coins except ones in #7 the dowry

function luckyPig() {
    let i = 0;    
    for (i = 3; i < 12; i++){ 
        // take all coinbox coins from all boxes starting at coinbox[3] and excluding coinbox[7]
        // #0 is our value holder, #1 has no corresponding space on board, #2 is the lucky pig (we're there), 
        // #4 doesn't exist, and you can't take #7 unless you rolled a 12 (you're king) - no coins there
        // add them to coinbox[0] if they are not in #7
        if (i != 7) { // don't touch dowry
        coinbox[0] += coinbox[i]; 
        console.log("coinbox[" + i + "], " + coinbox[i] + " and coinbox[0] " + coinbox[0]);
        coinbox[i] = 0;
        }
    }

    // add coins to p1 or p2 coins based on player turn
    if (playerTurn === "p1") {
        p1coins += coinbox[0];
        document.getElementById('p1coins').innerHTML = p1coins;
    } else if (playerTurn === "p2") {
        p2coins += coinbox[0];
        document.getElementById('p2coins').innerHTML = p2coins;
    }

    // zero out coinbox[0], {3, 5, 6, 8-11}
    coinbox[0] = 0;
    coinbox[3] = 0;
    document.getElementById('coinbox3').innerHTML = coinbox[3];
    coinbox[5] = 0;
    document.getElementById('coinbox5').innerHTML = coinbox[5];
    coinbox[6] = 0;
    document.getElementById('coinbox6').innerHTML = coinbox[6];
    coinbox[8] = 0;
    document.getElementById('coinbox8').innerHTML = coinbox[8];
    coinbox[9] = 0;
    document.getElementById('coinbox9').innerHTML = coinbox[9];
    coinbox[10] = 0;
    document.getElementById('coinbox10').innerHTML = coinbox[10];
    coinbox[11] = 0;
    document.getElementById('coinbox11').innerHTML = coinbox[11];
}

// ************* KING GAME OVER (12) *********
// Winner takes all coins
// Winner gets a message telling them they won
// Winner has a great time
function kingGameOver() {

    gameOver = true;
    if (playerTurn === "p1") {
        alert("PLAYER 1 IS KING! YOU WIN!")
    }
    if (playerTurn === "p2") {
        alert("PLAYER 2 IS KING! YOU WIN!")
    }
    let i = 3;
    for (i = 3; i < 12; i++){ 
        // take all coins
        coinbox[0] += coinbox[i]; 
        console.log("coinbox[" + i + "], " + coinbox[i] + " and coinbox[0] " + coinbox[0]);
        coinbox[i] = 0;
    }

    // add coins to p1 or p2 coins based on player turn
    if (playerTurn === "p1") {
        p1coins += coinbox[0];
        document.getElementById('p1coins').innerHTML = p1coins;
    } else if (playerTurn === "p2") {
        p2coins += coinbox[0];
        document.getElementById('p2coins').innerHTML = p2coins;
    }

    // zero out the coin counts
    let index = 0;
    for (index = 0; index < arrayLen; index++) { // iterate over the array to initialize all coin boxes to 0 coins
        coinbox[index] = 0;
    }
    document.getElementById('coinbox3').innerHTML = coinbox[3];
    // there is no coinbox 4
    document.getElementById('coinbox5').innerHTML = coinbox[5];
    document.getElementById('coinbox6').innerHTML = coinbox[6];
    document.getElementById('coinbox7').innerHTML = coinbox[7];
    document.getElementById('coinbox8').innerHTML = coinbox[8];
    document.getElementById('coinbox9').innerHTML = coinbox[9];
    document.getElementById('coinbox10').innerHTML = coinbox[10];
    document.getElementById('coinbox11').innerHTML = coinbox[11];

    document.getElementById('rollDice').style.visibility = 'hidden';
    alert("Game over");
    console.log(playerTurn = " has won the game.")
}

// ************* NORMAL ROLL RESULT ************
// - not a 2, 4, 7, or 12
function normalRollResult(dieThrowResult){
   
   let coinboxUpdate = "coinbox" + dieThrowResult;
   let addCoinButton = document.getElementById("addCoin");
   let takeCoinButton = document.getElementById("takeCoin");
   

   // enable or disable button based on whether there's a coin to take
   if (coinbox[dieThrowResult] === 0) {
        addCoinButton.disabled = false; // can only add coin
        takeCoinButton.disabled = true;
   } else if (coinbox[dieThrowResult] > 0) { 
        addCoinButton.disabled = false; // can add coin
        takeCoinButton.disabled = false; // can take coin
   }
   document.getElementById('addCoin').innerHTML = "ADD COIN TO " + dieThrowResult;
   
    addCoinButton.onclick = function(){
        console.log("It's player " + playerTurn +"'s turn, and we are adding a coin.")
        coinbox[dieThrowResult] += 1;
        addCoinButton.disabled = true; //disabled after click, enabled (or not) next roll
        takeCoinButton.disabled = true; // (ditto)

        if (playerTurn === "p1") {
            p1coins = p1coins - 1;
            alert("p1coins: " + p1coins);

            document.getElementById('p1coins').innerHTML = p1coins;
            document.getElementById(coinboxUpdate).innerHTML = coinbox[dieThrowResult];
            console.log("I'm updating the player turn to p2 from p1 as part of addCoinButton.onclick")
            updatePlayerTurn();
            document.getElementById('playerTurn').innerHTML = playerTurn;

        } else if (playerTurn === "p2"){ // else it's player 2's turn, so...
            console.log("It's player " + playerTurn +"'s turn, and we are adding a coin.")
            p2coins = p2coins - 1;
            alert("p2coins: " + p2coins);
            document.getElementById('p2coins').innerHTML = p2coins;
            console.log(coinbox[dieThrowResult]);
            document.getElementById(coinboxUpdate).innerHTML = coinbox[dieThrowResult];  
            console.log("I'm updating the player turn to p1 from p2 as part of addCoinButton.onclick")
            updatePlayerTurn();
            document.getElementById('playerTurn').innerHTML = playerTurn;
        }
    }

    takeCoinButton.onclick = function(){
        // finish this up
        console.log("TOOK COIN, changing player now");
        coinbox[dieThrowResult] -= 1;
        addCoinButton.disabled = true; //disabled after click, enabled (or not) next roll
        takeCoinButton.disabled = true; // (ditto)
        if (playerTurn === "p1") {
            p1coins = p1coins + 1;
            alert("p1coins: " + p1coins);

            document.getElementById('p1coins').innerHTML = p1coins;
            document.getElementById(coinboxUpdate).innerHTML = coinbox[dieThrowResult];
            console.log("I'm updating the player turn to p2 from p1 as part of addCoinButton.onclick")
            updatePlayerTurn();
            document.getElementById('playerTurn').innerHTML = playerTurn;

        } else if (playerTurn === "p2"){ // else it was player 2's turn, so...
            console.log("It's player " + playerTurn +"'s turn, and we are adding a coin.")
            p2coins = p2coins + 1;
            alert("p2coins: " + p2coins);
            document.getElementById('p2coins').innerHTML = p2coins;
            console.log(coinbox[dieThrowResult]);
            document.getElementById(coinboxUpdate).innerHTML = coinbox[dieThrowResult];  
            console.log("I'm updating the player turn to p1 from p2 as part of addCoinButton.onclick")
            updatePlayerTurn();
            document.getElementById('playerTurn').innerHTML = playerTurn;
        }   
    }

}


// ************* UPDATE PLAYER TURN **********
// switches between players; we need to keep track of whose turn it is
function updatePlayerTurn() {
    if (playerTurn === "p1") { // if p1, make p2
        playerTurn = "p2";
    } else if (playerTurn === "p2") { // already p2, make p1
        playerTurn = "p1";
    }
    console.log("Player's turn: " + playerTurn);
}


// ************** GAME OVER CHECK ************
// REQUIREMENTS MET ->
//       At least one javascript operator (&&, ===)

// Game is over when coins are out
function chkGameOver(gameOver) { 
    if ((playerTurn === "p1") && (p1coins === 0)) {  //player1 is out of coins
        gameOver = true;
        document.getElementById('rollDice').style.visibility = 'hidden';
        alert("Game Over, PLAYER 1 is out of coins!");
    } else if ((playerTurn === "p2") && (p2coins === 0)) { //player2 is out of coins
        gameOver = true;
        document.getElementById('rollDice').style.visibility = 'hidden';
        alert("Game Over, PLAYER 2 is out of coins!");
    } 

};


// ******** FUNCTIONS CLASS LESSON 02/11/2025 ******** */
// This highlights the fields where the players enter their names when they click on it.
// When the user deselects the box, it reverts to normal.
function highlightInput(sentElement){
    sentElement.style.background = "#E4F995";       //"#F6A21E"; //#ECF87F 
    }
function restoreInput(sentElement){
    sentElement.style.background = ""; //#FFFFFF
    }


// ******** FADE IN THE TITLE - JQUERY ******** 
// REQUIREMENTS ->
//        The use of a javascript library such as Bootstrap or Jquery to provide layout, control elements, or animation

// FADE IN THE TITLE
$(document).ready(function() {
    $("#hoverElement").hide().fadeIn(5000); // Ensure it's hidden first, then fade in
});


// *********** Random Notes From Class 01/16/2025 ***********

// document.body.style.backgroundImage

// document.images //the document.images, links and forms are automatically made into arrays

// paragraphs = documentGetElementsByTagName("p");
