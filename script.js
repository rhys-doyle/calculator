let eq = "";
const taskText = document.querySelector(".task");
let returnedFlag = false;
const resultDisplay = document.querySelector(".result");
const keepCalc = eq.charAt(0);

const push = document.querySelectorAll(".push");

let pressedButtonUI = element => {
  element.classList.add("pressed");
  setTimeout(() => {
    element.classList.remove("pressed");
  }, 75);
};

let buildTask = pressedValue => {
  eq = eq + pressedValue;
};

let clear = item => {
  item.innerHTML = "&nbsp;";
};

let renderEq = () => {
  const spacedEq = eq.split("").join(" ");
  const signAdjustedEq = spacedEq.replace(/\*|\//g, function(match) {
    return match == "*" ? "×" : "÷";
  });
  const wrappedEq = signAdjustedEq.replace(
    /\+|\÷|\×|\-/g,
    match => `<span>${match}</span>`
  );
  taskText.innerHTML = wrappedEq;
};

let renderResult = () => {
  const result = eval(eq);
  /* compensate for NaN and error and compensate for formatting */
  resultDisplay.textContent = result;
};

push.forEach(element => {
  element.onclick = event => {
    pressedButtonUI(element);

    let character = element.textContent;

    if (character === "×") {
      //multiply sign change
      character = "*";
    } else if (character === "÷") {
      //divide sign change
      character = "/";
    }

    if (character !== "=" && character !== "c") {
      if (returnedFlag) {
        returnedFlag = false;
        eq = "";
      }

      buildTask(character);

      if (
        (eq.charAt(eq.length - 1) === "(" &&
          eq.length > 1 &&
          parseInt(eq.charAt(eq.length - 2), 10) < 10) ||
        (eq.charAt(eq.length - 1) === "(" &&
          eq.length > 1 &&
          eq.charAt(eq.length - 2) === ")")
      ) {
        eq = eq.slice(0, -1);
        eq = eq + "*";
        buildTask(character);
      }

      renderEq();
    } else if (
      character === "=" &&
      resultDisplay.innerHTML !== "&nbsp;" &&
      taskText.innerHTML !== "&nbsp;"
    ) {
      console.log("howdy");
      eq = resultDisplay.textContent + eq;

      try {
        renderResult();
      } catch {
        taskText.textContent = "SYNTAX ERROR";
        clear(resultDisplay);
      }

      returnedFlag = true;
    } else if (character === "=") {
      console.log(taskText.textContent);
      console.log("ahoy");

      try {
        renderResult();
      } catch {
        taskText.textContent = "SYNTAX ERROR";
        clear(resultDisplay);
      }

      returnedFlag = true;
    } else if (
      character === "c" &&
      taskText.innerHTML !== "SYNTAX ERROR" &&
      taskText.innerHTML !== "&nbsp;"
    ) {
      eq = "";
      clear(taskText);
    } else if (character === "c" && taskText.textContent === "SYNTAX ERROR") {
      eq = "";
      clear(taskText);
    } else if (
      character === "c" &&
      taskText.innerHTML === "&nbsp;" &&
      resultDisplay.innerHTML !== "&nbsp;"
    ) {
      clear(resultDisplay);
    }
  };
});
