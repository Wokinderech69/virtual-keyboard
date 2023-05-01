import symbols from "./symbols.js";

const textareaElement = document.createElement("textarea");
textareaElement.classList.add("textarea");
document.body.appendChild(textareaElement);

const keyBoard = document.createElement("div");
keyBoard.classList.add("key-board");
textareaElement.after(keyBoard);

let lang = localStorage.getItem("Language") || "eng";

if (lang !== "eng" && lang !== "rus") {
  localStorage.setItem("Language", "eng");
  lang = "eng";
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

  const spaceButtonIndex = symbols.findIndex(
    (symbol) => symbol.button === "58"
  );

  button[58].addEventListener("click", function () {
    textareaElement.append(" ");
  });
  if (capsLock == 1) {
    buttons[29].classList.add("active-keys");
  }
}
full();

function mouseClick(button) {
  let attribute = button.getAttribute("data");
  switch (attribute) {
    case "29": // Caps Lock
      button.classList.toggle("active-keys");
      capsLock = capsLock === 0 ? 1 : 0;
      button = "";
      full();
      break;
    case "58": // Space
      textareaElement.append(" ");
      break;
    case "14": //Tab
      textareaElement.append("    ");
      break;
    case "13": // Backspace
      textareaElement.append(Backspace());
      break;
    case "28": // Delete
      textareaElement.append(Delete());
      break;
    case "57":
    case "59":
    case "55":
    case "56":
    case "60": // Empty value
      textareaElement.append("");
      break;
    case "41": // Enter
      textareaElement.append("\n");
      break;
    case "53": // Arrow Up
      textareaElement.append(ArrowUp());
      break;
    case "61": // Arrow Left
      textareaElement.append(ArrowLeft());
      break;
    case "62": // Arrow Down
      textareaElement.append(ArrowDown());
      break;
    case "63": // Arrow Right
      textareaElement.append(ArrowRight());
      break;
    case "42":
    case "54": // Arrow Right
      const shiftActive =
        document
          .querySelector('.buttons[data="57"]')
          .classList.contains("active") ||
        document
          .querySelector('.buttons[data="59"]')
          .classList.contains("active");
      if (shiftActive) {
        toggleLanguage();
      }
      break;
    case "42":
    case "54":
      textareaElement.append("");
      break;
    default: // Character key
      textareaElement.append(symbols[attribute].eng[capsLock]);
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
function Delete() {}

// Function to handle ArrowUp key press
function ArrowUp() {}

// Function to handle ArrowLeft key press
function ArrowLeft() {}

// Function to handle ArrowDown key press
function ArrowDown() {}

// Function to handle ArrowRight key press
function ArrowRight() {}
