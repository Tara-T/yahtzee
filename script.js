function diceRoll() {
    const roll = Math.floor(Math.random() * 6 + 1);
    return roll;
}

function diceDisplay() {
    const dice = document.querySelectorAll(".dice");
    Array.from(dice).forEach((die) => {
        die.innerHTML = diceRoll();
    });
}

function round() {
    const button1 = document.querySelector("#button1");
    let rolls = 3;

    button1.addEventListener("click", () => { diceDisplay()
      if (!--rolls) button1.setAttribute("disabled", "true");
    });
}
round();