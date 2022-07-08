//This variable keeps track of who's turn it is.
let activePlayer = 'X';
//This array stores an array of moves. We use this to determine win conditions
let selectedSquares = [];
    
    //This function is for placing an x or o in a squar 
    function placeXOrO(squareNumber) {
        //This condition ensures a square hasn't be selected already.
        //The.some () method is used to check each element of selectedsquare array to
        //see if it contains the square number clicked on.
        if (!selectedSquares.some (element => element.includes(squareNumber))) {
            //This variable retrieves the html element id that was clicked.
            let select = document.getElementById(squareNumber);
            //This condition checks who's turn it is
            if (activePlayer === 'X') {
                //If actavePlayer equal to 'X', the x.png is placed in HTML.
                select.style.backgroundImage = 'url("./images/x.png")';
            //Active player may only be 'X' or 'O', if not 'X' it must be 'O'
            } else {
                //If activePlayer is equal to O', the o.png is placed in HTML.
                select.style.backgroundImage = 'url("./images/o.png")';
            }
            //squareNumber and activePlayer are concatenated together and added to array.
            selectedSquares.push(squareNumber + activePlayer) ;
            //This calls a function to check for any win conditions.
            checkWinConditions();
            //This condition is for changing the active player.
            if (activePlayer === 'X') {
                //If active player is 'X'change it to 'O'. 
                activePlayer = 'O';
            //IF active player is anthing other than 'X'.
            } else {
                //Change the activePlayer to 'X'
                activePlayer = 'X';
            }
            //This function plays placement sound.
            audio('./media/place.mp3');
            //This condition checks to see if it is computers turn.
            if(activePlayer === 'O'){
                //This function disables clicking for computer choice.
                disableClick();
                //This function waits 1 second before placing the image
                //and enabling click.
            setTimeout(function () { computersTurn (); }, 1000);
        }
        //Returning true is needed for our computersTurn() Function to work.
        return true;      
    }
//This function results in a random square being selected.
function computersTurn() {
    //This boolean is needed for our while loop.
    let success = false;
    //This variable stores a random number 0-8
    let pickASquare;
    //This condition allows our while loop to keep
    //trying if a square is selected already.
    while(!success) {
        //A random number between O and 8 is selected
        pickASquare = String(Math.floor(Math.random() * 9))
        //If the random number evaluates returns true, the square hasn't been selected yet.
        if (placeXOrO(pickASquare)) {
            //This line calls the function.
            placeXOrO(pickASquare);
            //This changes our boolean and ends the loop.
            success = true;
        };
     } 

    }
}
//this function parses the selectedsquares array to search for win conditions.
//drawWinline function os called to draw line if condition is met.
function checkWinConditions() {
    //x 0,1,2 condtition.
    if (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100); }
    //x 3,4,5 condition
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304); }
    //x 6,7,8 condition
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508); }
    //x 0,3,6 condition
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558); }
    //x 1,4,7 condition
    else if (arrayIncludes('1X', '4X' , '7X')) { drawWinLine(304, 50, 304, 558); }
    //x 2,5,8 condition
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558); }
    //x 6,4,2 condition
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90); }
    //x 0,4,8 condition
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520); }
    //O 0,1,2 condtition.
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100); }
    //O 3,4,5 condition
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304); }
    //O 6,7,8 condition
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508); }
    //O 0,3,6 condition
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558); }
    //O 1,4,7 condition
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558); }
    //O 2,5,8 condition
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558); }
    //O 6,4,2 condition
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90); }
    //O 0,4,8 condition
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520); }
    // this condition checks for tie. If none of the above conditions register
    //and 9 squares are selected the code executes.
    else if (selectedSquares.length >= 9) {
        //this function plays the tie game sound 
        audio('./media/tie.mp3');
        //this function sets a .3 timer before the resetGame is called.
        setTimeout(function () { resetGame(); }, 1000);
    }
    //this function checks if an array includes 3 strings.
    //it is used to check for each win condition.
    function arrayIncludes(squareA, squareB, squareC) {
        //the next 3 variables will be used to check for 3 in a row.
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        //if the 3 variables we pass are all included in our array true is 
        //returned and our else if condition executes the drawWinLine function.
        if (a === true && b === true && c === true) { return true; }
    }
}
//this function makes our body element temoirarily unclickable.
function disableClick() {
    //this makes our body unclcikable
    body.style.pointerEvents ='none';
    //this makes our body clickable again after 1 second.
    setTimeout(function() { body.style.pointerEvents = 'auto'; }, 1000);
}

//this function takes a string parameter of the path you set earlier for 
// placement sound ('./media/place.mp3)
function audio(audioURL) {
    //we create a new aduio object and we pass the path as a parameter.
    let audio = new Audio(audioURL);
    //play method plays our audio sound.
    audio.play();
}
// this function utilizes html canvas to draw lines.
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    //this line accesses our html canvas element.
    const canvas = document.getElementById('win-lines');
    //this line give access to methods and properties to use on canvas.
    const c = canvas.getContext('2d');
    //this line indicates where the start of a lines x axis is.
    let x1 = coordX1 ,
        //this line indicates where the start of a lines y axis is.
        y1 = coordY1 ,
        //this line indicates where the end of a lines x axis is
        x2 = coordX2,
        //this line indicates where the end of a lines y axis is
        y2 = coordY2,
        //this variable stores the x axis data we update in our animation loop.
        x = x1,
        //this variable stores the y axis date we update in our aimation loop.
        y = y1;

//this function interacts with the canvas
function animateLineDrawing() {
    //this variable crates the loop for when the game ends it restarts.
    const animationLoop = requestAnimationFrame(animateLineDrawing);
    //this method clears content from last loop iteration.
    c.clearRect(0, 0, 608, 608);
    //this method starts a new path
    c.beginPath();
    //this method moves us to a string point for our line.
    c.moveTo(x1, y1);
    //this method indicates the end point for our line.
    c.lineTo(x, y);
    //this method sets the width of our line.
    c.lineWidth = 10;
    //this method sets the color of our line
    c.strokeStyle = 'rgba(70, 255, 33, .8)';
    //this method draws everything we laid out above
    c.stroke();
    //this condition checks if we've reached the endpoint.
    if (x1 <= x2 && y1 <= y2) {
        //this condition adds 10 to the previous end x point.
        if (x < x2) { x += 10; }
        //this condition adds 10 to the previous end y point
        if (y > y2) { y += 10; }
        //this condition cancels our animation loop if reached end points 
        if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
    }
    //this condition is similar to the one above.
    //it was necessary for the 6, 4, 2 win condition.
    if (x1 <= x2 && y1 >= y2) {
        if (x <x2) { x += 10; }
        if (y > y2) { y -= 10; }
        if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
    }

}
//this function clears our canvas after win line is drawn.
function clear() {
    //this line starts our animation loop
    const animationLoop = requestAnimationFrame(clear);
    //this line clears our canvas.
    c.clearRect(0, 0, 608, 608);
    //this line stops our animatonLoop
    cancelAnimationFrame(animationLoop);
}
    //this line disallows clickling while the win sound is playing
    disableClick();
    //this line plays the win sounds.
    audio('./media/winGame.mp3');
    //tis line calls our main loop.
    animateLineDrawing();
    //this line waits 1 secons.
    //then, clears canvas, resets game, allows clicking again.
    setTimeout(function () { clear(); resetGame(); }, 1000);
}
//this function resets the game in a tie or win 
function resetGame() {
    //this for loop iterates through each html square element
    for (let i = 0; i < 9; i++) {
        //this variable gets the html element of i 
        let square = document.getElementById(String(i));
        //this removes our elements backgroundImage.
        square.style.backgroundImage = '';
    }
    //this resets our arra so it is empty and we can start over.
    selectedSquares = [];
}



