const dice = document.querySelectorAll(".dice");
const diceNumbers = {}

function diceRoll() {
    const roll = Math.floor(Math.random() * 6 + 1);
    return roll;
}

function diceDisplay() {
    Array.from(dice).forEach((die) => {
        if (diceNumbers[die.id]) return;
        die.innerHTML = diceRoll();
    });
}
function stopDice() {
    Array.from(dice).forEach(function (die) {
        die.addEventListener("click", () => {
            diceNumbers[die.id] = die.innerHTML;
        })
    });
}
function round() {
    const button1 = document.querySelector("#button1");
    let rolls = 3;

    button1.addEventListener("click", () => {
        diceDisplay();
        stopDice();
        console.log(singles())
        if (!--rolls) button1.setAttribute("disabled", "true");
         
    });
}

function getDice() {
    return [...dice].map(function (die) {
        return die.textContent;
    });
}

function singles(num) {
    // If there is no number just give up from the start
    if (!getDice().includes(num)) return 0; 
    
        let arr = getDice().filter(function (item) { return item == num; })
        let convertInt = arr.map((i) => Number(i));

        let sum = 0;
        console.log(convertInt.length)

    for (let z = 0; z < convertInt.length; z++) {
        sum += convertInt[z];}
    
    return sum;
}

 
function singlesClick() {
    const player1Sigle = document.querySelectorAll(".player1-single")
    Array.from(player1Sigle).forEach(function (single) {
        single.addEventListener("click", () => {
         single.innerHTML = singles(single.getAttribute("data-name"));
        })
    });
}
  

round()
singlesClick()

