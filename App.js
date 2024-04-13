//Here we want to access each and every button so that when it is clicked
//an X or O will be appeared.

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-Btn");
let newBtn = document.querySelector("#new-Btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


//We will play this game turn wise which means first player 1 will play
//next player 2 will play
//Hence the code should know whose turn should be the next
// If "X" is pressed on first button then the next button should be "O".
//similarly after "O" next when button is pressed then it should be "X".

let turnO = true;//Player X, Player O 
//Marking player O as true

//Now we will store the winning patterns in order to win the game

//This can be stored in an 2D Array
//2D Array - example

// let arr = [["Mango","banana"],["Potato","Onions"],["Lilly","Mogra"]];

/*

Winning patterns

Horizontal Patterns
0 1 2 (all 3 can X X X or O O O)
3 4 5 (all 3 can X X X or O O O)
6 7 8 (all 3 can X X X or O O O)

vertical Patterns
0 3 6 (all 3 can X X X or O O O)
1 4 7 (all 3 can X X X or O O O)
2 5 8 (all 3 can X X X or O O O)

Diagonal Patterns
0 4 8 (all 3 can X X X or O O O)
2 4 6 (all 3 can X X X or O O O)

*/

//A 2D Array
const winPatterns = [
    [0, 1, 2], //Patterns starting with 0
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7], //Patterns starting with 1
    [2, 5, 8], //Patterns starting with 2
    [2, 4, 6],
    [3, 4, 5], //Patterns starting with 3
    [6, 7, 8]
];

//Now when a button/box is clicked an action should be performed, hence
//we will use EVENT LISTENERS

boxes.forEach((box)=>{
    //for each box an action should be performed.
    box.addEventListener("click",() => {
        console.log("box was clicked!");

        //If turn O is true then inner text will be O and we will
        //it's set to false
        if(turnO === true){ //Player O's turn
            box.innerText = "O";
            turnO = false;
        }else{
            box.innerText = "X"; //Player X's turn
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

//Once a player wins the game then again no player can click the buttons
//again hence we will disable them.
const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

//to start a new Game we will enable the boxes
const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

//To display the winner
const showWinner = (winner) =>{
    msg.innerText = `Congralutions, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
}


//now we need to check as soon as a button is clicked if there is
//a winner in our game
//Therefore we will create a function in order to check that

const checkWinner = () => {
    //we have 8 win patterns we will check each pattern inside this
    //function 
    // for ex : [0,1,2] = if all 3 positions have same element
    // X or O then we got a winner
    // if any one of the box is empty or element is not matching
    //with other boxes then we will check next row or column or diagonal

    for(let pattern of winPatterns){
        //pattern is an array

        //checking indivdual boxes what value is present.
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner!", pos1Val);
                showWinner(pos1Val);
                celebrate();
            }
        }
    }
};


//To reset the game
const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};


//Adding event Listeners for resetting the game and to start the new game
//whenever we click on the buttons a fresh game should start

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click",resetGame);