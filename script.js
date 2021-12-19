const dice = document.querySelectorAll(".dice");
const player1 = document.querySelectorAll(".player1")
const player2 = document.querySelectorAll(".player2")

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
function round(button) {
    let rolls = 3;

    button.addEventListener("click", () => {
        // calls functions and which run the event listeners so you ca click on the score table 
        diceDisplay();
        stopDice();
        singlesClick();
        smallStraight(getDice())
        largeStraight(getDice());
        yahtzee();
        chance(getDice());
        duplicatesCountClick();
        //missing event listeners TODO: fix 


        //debugging
       // console.log(chance(getDice()))
       // console.log(scoreSingles());
       // console.log(singles())
       // console.log(largeStraight(getDice()))
       // console.log(fullHouse(getDice()))


        //disables button after 3 rounds
        if (!--rolls) button.setAttribute("disabled", "true");

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

    for (let z = 0; z < convertInt.length; z++) {
        sum += convertInt[z];
    }

    return sum;
}

function smallStraight(dice) {
    const arr = ["1", "2", "3", "4"]
    const arr2 = ["2", "3", "4", "5"]
    const arr3 = ["3", "4", "5", "6"]

    let option1 = arr.every((val) => dice.includes(val))
    let option2 = arr2.every((val) => dice.includes(val))
    let option3 = arr3.every((val) => dice.includes(val))

    if (option1 == true || option2 == true || option3 == true) {
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
    const ofAKindTable = document.querySelectorAll(".ofAKind")
    Array.from(ofAKindTable).forEach(function (el) {
        el.addEventListener("click", function () {
            el.innerHTML = duplicatesCount(el.getAttribute("data-name"), getDice())
        })
    });
}
//there is probably a way to combine this in to one but lets not

function singlesClick() {
    const singlesTable = document.querySelectorAll(".single")
    Array.from(singlesTable).forEach(function (single) {
        single.addEventListener("click", () => {
            single.innerHTML = singles(single.getAttribute("data-name"));
          
        })
    });
}
function scoreSingles(scoreList) {


    let singleScore = 0;
    let bonus = 0;

    Array.from(scoreList).forEach(function (el) {

        singleScore += Number(el.innerHTML);
    })

    if (singleScore >= 63) {
        bonus = 35;
    }
    else { bonus = 0 }

  //  console.log(bonus)

    return (singleScore + bonus);

}

function yahtzee(largeStraight) {
    if (largeStraight = 40) { return 50 }
    return 0;
}

function chance(dice) {

    let sum = 0;

    Array.from(dice).forEach(function (die) {
        sum += Number(die);
        console.log(die)
    })
    return sum;

}

function totalScore(singleScore, ofAKindScore, chance, yahtzee) {

    let total = 0;

    total = singleScore + ofAKindScore + chance + yahtzee; //add rest of scores

    return total;

}

function game() {
    //loop it 13 times cuz thats how many times it needs to fill the whole thing
    for (let i = 0; i < 14; i++) { 
        console.log(i)

        const button1 = document.querySelector("#button1");
        const button2 = document.querySelector("#button2");

        button2.setAttribute("disabled", "true");

        round(button1)

        //stops the buttion after score is picked
        const player1 = document.querySelectorAll(".player1")
        Array.from(player1).forEach(function (p1) {
            p1.addEventListener("click", () => {
                button1.setAttribute("disabled", "true");
                button2.disabled = false;
            })
        })


        round(button2)
        
        const player2 = document.querySelectorAll(".player2")
        Array.from(player2).forEach(function (p2) {
            p2.addEventListener("click", () => {
                button2.disabled = true;
                button1.disabled = false;
            })
        })

    }

    

    //display score when done
    document.querySelector("#sum1").innerHtml = totalScore(); //if the function was complete that is
    // and if the loop actually worked 

}
//{  }


game()
