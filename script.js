let boxes = document.querySelectorAll(".box");
let reset = document.getElementById("reset");
let msgContainer = document.querySelector(".msg-container");
let msg = document.getElementById("msg");

let turnO = true;

let count = 0;

let pattern = [
    [0 , 1 , 2] , 
    [3 , 4 , 5] , 
    [6 , 7 , 8] , 
    [0 , 3 , 6] , 
    [1 , 4 , 7] , 
    [2 , 5 , 8] , 
    [0 , 4 , 8] , 
    [2 , 4 , 6]
];

const resetGame = () => {
    enableBoxes();
    turnO = true;
    count = 0;  
    msgContainer.classList.add("hide");
}

boxes.forEach((box) =>{
    box.addEventListener("click" , () => {
        if (turnO){
            box.innerText = "O";
            turnO = false;
            count++;
        }
        else {
            box.innerText = "X";
            turnO = true;
            count++;
        }
        box.disabled = true;
        checkWinner();
    })
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const draw = () => {
    msg.innerText = "Draw :/";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations !!! Winner is ${winner} :)`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    let winnerFound = false;

    for (let p of pattern) {
        let pos1 = boxes[p[0]].innerText;
        let pos2 = boxes[p[1]].innerText;
        let pos3 = boxes[p[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                winnerFound = true;
                showWinner(pos1);
                return;
            }
        }
    }
    if (!winnerFound && count === 9) {
        draw();
    }
}

reset.addEventListener("click" , resetGame);