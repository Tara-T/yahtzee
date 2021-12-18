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
        console.log(largeStraight(getDice()))
         console.log(fullHouse(getDice()))
       
        if (!--rolls) button1.setAttribute("disabled", "true");

    });
}

function getDice() {
    return [...dice].map(function (die) {
        return die.textContent;
    });
}

function smallStraight(dice) {
    const arr = ["1", "2", "3", "4"]
    const arr2 = ["2", "3", "4", "5"]
    const arr3 = ["3", "4", "5" ,"6"]

    let option1 = arr.every((val) => dice.includes(val))
    let option2 = arr2.every((val) => dice.includes(val))
    let option3 = arr3.every((val) => dice.includes(val))

    if (option1 == true || option2 == true || option3 == true ) {
        return 30;
    }
    return 0;
   
}

function largeStraight(dice) {

    const arr = ["1", "2", "3", "4", "5"]
    const arr2 = ["2", "3", "4", "5", "6"]

    let option1 = arr.every((val) => dice.includes(val))
    let option2 = arr2.every((val) => dice.includes(val))

    if (option1 == true || option2 == true) return 40;

    return 0;
}



function singles(num) {
    // If there is no number just give up from the start
    if (!getDice().includes(num)) return 0;

    let arr = getDice().filter(function (item) { return item == num; })
    let convertInt = arr.map((i) => Number(i));

    let sum = 0;
    console.log(convertInt.length)

    for (let z = 0; z < convertInt.length; z++) {
        sum += convertInt[z];
    }

    return sum;
}

function duplicatesCount(count, dice) {
    const counts = {};

    for (const arr of dice) {
      counts[arr] = counts[arr] ? counts[arr] + 1 : 1;
    }

    const tmp = Object.values(counts);
  
    for (let i = 0, len = tmp.length; i < len; ++i) {
      if (tmp[i] >= count) return dice.reduce((a, b) => parseInt(a) + parseInt(b));
    }
  
    return 0;
  }
  function fullHouse(dice) {
    const counts = {};

    for (const arr of dice) {
      counts[arr] = counts[arr] ? counts[arr] + 1 : 1;
    }

    const tmp = Object.values(counts);

    let threeOfAKind = false, twoOfAKind = false;
    for (let i = 0, len = tmp.length; i < len; ++i) {
      if (tmp[i] == 2) twoOfAKind = true;
      if (tmp[i] == 3) threeOfAKind = true;
    }
  
    if (twoOfAKind && threeOfAKind) return 25;
    return 0;
  }
      
function duplicatesCountClick() {
    const player1ofAKind = document.querySelectorAll(".player1-ofAKind")
    Array.from(player1ofAKind).forEach(function (el) {
        el.addEventListener("click", function() {
            el.innerHTML = duplicatesCount(el.getAttribute("data-name"), getDice())
        })
    });
}
//there is probably i way to combine this in to one but lets not
 
function singlesClick() {
    const player1Sigle = document.querySelectorAll(".player1-single")
    Array.from(player1Sigle).forEach(function (single) {
        single.addEventListener("click", () => {
            single.innerHTML = singles(single.getAttribute("data-name"));
        })
    });
}

duplicatesCountClick() 
round()
singlesClick()

