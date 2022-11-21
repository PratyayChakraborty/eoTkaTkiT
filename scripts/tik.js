// console.log("Tik")
let boxes = document.querySelectorAll(".box");
let PlayerText = document.querySelector("#PlayerText");
// console.log(boxes)
const O = "O";
const X = "X";
let current_player = X;
let spaces = Array(9).fill(null);
// console.log(spaces)
let players = JSON.parse(localStorage.getItem("players")) || [];

console.log(players)
let winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
function PlayerHasWon() { 
    for(let condition of winners) {
        let [a, b, c] = condition;
        // console.log(condition);
        if (spaces[a] && (spaces[b] == spaces[a] && spaces[c] == spaces[a])) {
            return [a, b, c];
        }
        
    }
    return false;
}
let startGame = () => {
    boxes.forEach((box,ind) => { 
        box.addEventListener("click", function () { boxClicked(ind)} );
    })
}
    function boxClicked(id) { 
        
        if (current_player ==X) { var player =players[0] }
            else {var player = players[1] }
        // console.log(spaces)
        if (spaces[id] == null&&PlayerHasWon()==false) {
            boxes[id].innerText = current_player;
            spaces[id] = current_player;
        }
        // console.log(PlayerHasWon())
        if (PlayerHasWon() !== false) {
            PlayerText.innerText = `${player} Has Won!!!`;
            PlayerText.style.color = "green";
            winner_block = PlayerHasWon();
            winner_block.map(function (el) { boxes[el].style.color="green" })
        }
        if (checkspace()&& PlayerHasWon()==false){ 
            PlayerText.innerText= `It's a Tie`
        }
        if(PlayerHasWon()==false){current_player = current_player == X ? O : X}
    }
startGame();
function checkspace() {
    let flag = true;
    if (spaces.forEach(function (el) {
        // console.log(el == null)
        if (el == null) {
            return flag = false;
        }
        // console.log(el)
        
    }) == false) { return flag}
    return flag;
}
document.getElementById("playagain").addEventListener("click", playagain);
function playagain() { 
    console.log("playagain")
    let body = document.querySelector("body");
    body.innerHTML = "";
    
    img = document.createElement("img"); 
    img.src = "https://c.tenor.com/UnFx-k_lSckAAAAM/amalie-steiness.gif";
    body.style.margin = "auto";
    body.appendChild(img);
    localStorage.clear();
    setTimeout(function () { 
        location.reload();
    },3000)
}
let from = document.getElementById("name");
document.getElementById("play").addEventListener("click", play);
function play() {
    let p1 = document.getElementById("player1").value;
    let p2 = document.getElementById("player2").value;
    players.push(p1);
    players.push(p2);
    localStorage.setItem("players", JSON.stringify(players));
    document.getElementById("put").style.display="none";
}