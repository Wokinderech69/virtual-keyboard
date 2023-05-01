import symbols from "./symbols.js";

const title = document.createElement("h1");
let titleDesc = document.createTextNode("RSS Virtual Keyboard");
title.appendChild(titleDesc);
title.classList.add("title");
document.body.appendChild(title);

const textareaElement = document.createElement("textarea");
textareaElement.classList.add("textarea");
title.after(textareaElement);

const keyBoard = document.createElement("div");
keyBoard.classList.add("key-board");
textareaElement.after(keyBoard);

//=====Language======
let getLocalStorage = localStorage.getItem("Language");
let lang;
let shiftAlt = [];
switch (getLocalStorage) {
  case null:
    localStorage.setItem("Language", "eng");
    lang = "eng";
    break;
  case "eng":
    lang = "eng";
    break;
  case "rus":
    lang = "rus";
    break;
  default:
    break;
}

const capsLock = 0;

let button = "";
function full() {
  for (let i = 0; i < symbols.length; i++) {
    let symbol = lang === "eng" ? symbols[i].eng : symbols[i].rus;
    let buttonText = symbol[capsLock] || symbol.default;
    button +=
      '<div class="buttons" data="' +
      symbols[i].button +
      '">' +
      buttonText +
      "</div>";
  }
  keyBoard.innerHTML = button;
  //type with the mouse
  const buttons = document.querySelectorAll(".buttons");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (event) {
      mouseClick(event.target);
    });
  }
}
full();

let activeShift;
let pressedShift = false;
let pressedAlt = false;
let pressedAltGr = false;

function mouseClick(clicked) {
  let attribute = clicked.getAttribute("data");
  if (attribute == "29") {
    clicked.classList.toggle("active-keys");
    if (capsLock == 0) {
      capsLock = 1;
    } else if (capsLock == 1) {
      capsLock = 0;
    }
    button = "";
    full();
    activeCapsLock();
  } else if (attribute == "13") {
    textareaElement.append(Backspace());
  } else if (attribute == "14") {
    textareaElement.append(Tab());
  } else if (attribute == "28") {
    textareaElement.append(Delete());
  } else if (attribute == "41") {
    textareaElement.append(Enter());
  } else if (attribute == "53") {
    textareaElement.append(ArrowUp());
  } else if (attribute == "58") {
    textareaElement.append(Space());
  } else if (attribute == "61") {
    textareaElement.append(ArrowLeft());
  } else if (attribute == "62") {
    textareaElement.append(ArrowDown());
  } else if (attribute == "63") {
    textareaElement.append(ArrowRight());
  } else if (
    ((attribute == "57" || attribute == "59") &&
      (document
        .querySelector('.buttons[data="42"]')
        .classList.contains("active") ||
        document
          .querySelector('.buttons[data="54"]')
          .classList.contains("active"))) ||
    ((attribute == "42" || attribute == "54") &&
      (document
        .querySelector('.buttons[data="57"]')
        .classList.contains("active") ||
        document
          .querySelector('.buttons[data="59"]')
          .classList.contains("active")))
  ) {
    textareaElement.append("");
    if (lang == "eng") {
      localStorage.setItem("Language", "rus");
      lang = "rus";
    } else if (lang == "rus") {
      localStorage.setItem("Language", "eng");
      lang = "eng";
    }
    if (
      document.querySelector('.buttons[data="42"]').classList.contains("active")
    )
      activeShift = "42";
    if (
      document.querySelector('.buttons[data="54"]').classList.contains("active")
    )
      activeShift = "54";
    button = "";
    fill();
    addPress();
  } else if (["42", "54", "55", "56", "57", "59", "60"].includes(attribute)) {
    textareaElement.append("");
  } else {
    if (lang == "rus") {
      textareaElement.append(Other(symbols[attribute].rus[capsLock]));
    } else {
      textareaElement.append(Other(symbols[attribute].eng[capsLock]));
    }
  }
}

function activeCapsLock() {
  const buttons = document.querySelectorAll(".buttons");
  if (capsLock == 1) {
    buttons[29].classList.add("active-keys");
  }
}

function addPress() {
  const button = document.querySelectorAll(".buttons");
  if (pressedShift == true) {
    button[activeShift].classList.add("active");
  }
  if (pressedAlt == true) {
    button[57].classList.add("active");
  }
  if (pressedAltGr == true) {
    button[59].classList.add("active");
  }
}

// Function to handle Backspace key press
function getCaret(el) {
  return el.selectionStart ?? el.createTextRange()?.text?.length ?? 0;
}

function resetCursor(txtElement, currentPos) {
  if (txtElement.setSelectionRange) {
    txtElement.focus();
    txtElement.setSelectionRange(currentPos, currentPos);
  } else if (txtElement.createTextRange) {
    txtElement.createTextRange()?.moveStart("character", currentPos)?.select();
  }
}

function Backspace() {
  let textarea = document.querySelector(".textarea");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let backSpace = text.slice(0, currentPos - 1) + text.slice(currentPos);
  textarea.value = backSpace;
  resetCursor(textarea, currentPos - 1);
}

// Function to handle Delete key press
function Delete() {
  let textarea = document.querySelector(".textarea");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del =
    text.substr(0, currentPos) + text.substr(currentPos + 1, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos);
}

// Function to handle ArrowUp key press
function ArrowUp() {}

// Function to handle ArrowLeft key press
function ArrowLeft() {
  let textarea = document.querySelector(".textarea");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del = text.substr(0, currentPos) + text.substr(currentPos, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos - 1);
}

// Function to handle ArrowDown key press
function ArrowDown() {}

// Function to handle ArrowRight key press
function ArrowRight() {
  let textarea = document.querySelector(".textarea");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del = text.substr(0, currentPos) + text.substr(currentPos, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos + 1);
}

// Function to handle Enter key press
function Enter() {}

// Function to handle Others key press
function Other(data) {}

// Function to handle ArrowUp key press
function Space() {}

// Function to handle ArrowUp key press
function Tab() {}
