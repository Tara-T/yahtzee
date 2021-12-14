const dice = document.querySelectorAll(".dice");

function diceRoll() {
  const roll = Math.floor(Math.random() * 6 + 1);
  return roll;
}

function diceDisplay() {
  Array.from(dice).forEach((die) => {
    die.innerHTML = diceRoll();
  });
}
function stopDice() {
  Array.from(dice).forEach(function (die) {
    die.addEventListener("click", () => die.innerHTML = ); //how would you stop the clicked die?
  });
}
function round() {
  const button1 = document.querySelector("#button1");
  let rolls = 3;

  button1.addEventListener("click", () => {
    diceDisplay();
    if (!--rolls) button1.setAttribute("disabled", "true");
    else {
      stopDice();
      getDice();
      ones();
    }
  });
}

function getDice() {
  return [...dice].map(function (die) {
    return die.textContent;
  });
}
function ones() {
  if (getDice().includes(1) == true) {
    console.log("it works");
  }
}

round();
