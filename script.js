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

const description = document.createElement("div");
description.classList.add("description");
description.innerText =
  "The keyboard is created in the Windows operating system";
keyBoard.after(description);

const desc = document.createElement("div");
desc.classList.add("desc");
desc.innerText = "To switch the language combination: Alt + Shift";
description.after(desc);

//=====Language======
let getLocalStorage = localStorage.getItem("Language");
let lang;
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

let capsLock = 0;

let button = "";
function full() {
  for (let i = 0; i < symbols.length; i++) {
    if (lang == "eng") {
      button +=
        '<div class="buttons" data="' +
        symbols[i].button +
        '" >' +
        symbols[i].eng[capsLock] +
        "</div>";
    } else if (lang == "rus") {
      button +=
        '<div class="buttons" data="' +
        symbols[i].button +
        '" >' +
        symbols[i].rus[capsLock] +
        "</div>";
    }
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

let activeShift = 0;
let pressedShift = false;
let pressedAlt = false;
let pressedAltGr = false;
let activeCaps;

function activeCapsLock() {
  const buttons = document.querySelectorAll(".buttons");
  if (activeCaps == true) {
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

function mouseClick(clicked) {
  let attribute = clicked.getAttribute("data");
  let exitShould = false;
  if (attribute == "29") {
    clicked.classList.toggle("active-keys");
    if (capsLock == 0) {
      capsLock = 1;
    } else if (capsLock == 1) {
      capsLock = 0;
    }
    if (clicked.classList.contains("active-keys")) {
      activeCaps = true;
    } else {
      activeCaps = false;
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
    // code for language switch
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
    if (
      document
        .querySelector('.buttons[data="29"]')
        .classList.contains("active-keys")
    )
      activeCaps = true;
    button = "";
    full();
    activeCapsLock();
    addPress();
    exitShould = true;
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
  return null;
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
  return null;
}

// Function to handle ArrowUp key press
function ArrowUp() {
  let textarea = document.querySelector(".textarea");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del =
    text.substr(0, currentPos) + "▲" + text.substr(currentPos, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos + 1);
  return null;
}

// Function to handle ArrowLeft key press
function ArrowLeft() {
  let textarea = document.querySelector(".textarea");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del =
    text.substr(0, currentPos) + "◄" + text.substr(currentPos, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos + 1);
  return null;
}

// Function to handle ArrowDown key press
function ArrowDown() {
  let textarea = document.querySelector(".textarea");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del =
    text.substr(0, currentPos) + "▼" + text.substr(currentPos, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos + 1);
  return null;
}

// Function to handle ArrowRight key press
function ArrowRight() {
  let textarea = document.querySelector(".textarea");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del =
    text.substr(0, currentPos) + "►" + text.substr(currentPos, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos + 1);
  return null;
}

// Function to handle Enter key press
function Enter() {
  let textarea = document.querySelector(".textarea");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del =
    text.substr(0, currentPos) + "\n" + text.substr(currentPos, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos + 1);
  return null;
}

// Function to handle Others key press
function Other(data) {
  let textarea = document.querySelector(".textarea");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del =
    text.substr(0, currentPos) + data + text.substr(currentPos, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos + 1);
  return null;
}

// Function to handle ArrowUp key press
function Space() {
  let textarea = document.querySelector(".textarea");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del =
    text.substr(0, currentPos) + " " + text.substr(currentPos, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos + 1);
  return null;
}

// Function to handle ArrowUp key press
function Tab() {
  let textarea = document.querySelector(".textarea");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del =
    text.substr(0, currentPos) + "    " + text.substr(currentPos, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos + 4);
  return null;
}

//================= actions when pressing keys ====================
document.addEventListener("keydown", function (e) {
  for (let i = 0; i < symbols.length; i++) {
    let boxButton = document.querySelector(
      '.buttons[data="' + symbols[i].button + '"]'
    );
    if (e.key == "Shift") {
      if (pressedShift == true) {
      } else {
        if (e.code == symbols[i].code) {
          boxButton.classList.add("active");
          e.preventDefault();
          boxButton.click();
          if (capsLock == 0) {
            capsLock = 1;
          } else if (capsLock == 1) {
            capsLock = 0;
          }
          if (
            document
              .querySelector('.buttons[data="42"]')
              .classList.contains("active")
          )
            activeShift = "42";
          if (
            document
              .querySelector('.buttons[data="54"]')
              .classList.contains("active")
          )
            activeShift = "54";
          button = "";
          full();
          pressedShift = true;
          addPress();
          activeCapsLock();
          break;
        }
      }
    } else if (e.key == "Control") {
      if (e.code == symbols[i].code) {
        boxButton.classList.add("active");
        boxButton.click();
        e.preventDefault();
        break;
      }
    } else if (e.code == "AltRight") {
      if (pressedAltGr == true) {
      } else {
        if (e.code == symbols[i].code) {
          boxButton.classList.add("active");
          document
            .querySelector('.buttons[data="55"]')
            .classList.remove("active");
          boxButton.click();
          e.preventDefault();
          pressedAltGr = true;
          addPress();
          break;
        }
      }
    } else if (e.code == "AltLeft") {
      if (pressedAlt == true) {
      } else {
        if (e.code == symbols[i].code) {
          boxButton.classList.add("active");
          boxButton.click();
          e.preventDefault();
          pressedAlt = true;
          addPress();
          break;
        }
      }
    } else {
      for (let j = 0; j < symbols[i].all.length; j++) {
        if (e.key == symbols[i].all[j]) {
          boxButton.classList.add("active");
          e.preventDefault();
          boxButton.click();
          break;
        }
      }
    }
  }
});

//================= actions when releasing keys ====================
document.addEventListener("keyup", function (e) {
  for (let i = 0; i < symbols.length; i++) {
    for (let i = 0; i < symbols.length; i++) {
      let boxButton = document.querySelector(
        '.buttons[data="' + symbols[i].button + '"]'
      );
      if (e.key == "Shift") {
        if (pressedShift == false) {
        } else {
          if (e.code == symbols[i].code) {
            boxButton.classList.remove("active");
            if (capsLock == 0) {
              capsLock = 1;
            } else if (capsLock == 1) {
              capsLock = 0;
            }
            button = "";
            full();
            activeCapsLock();
            pressedShift = false;
            break;
          }
        }
      } else if (e.code == "AltRight") {
        if (pressedAltGr == false) {
        } else {
          if (e.code == symbols[i].code) {
            boxButton.classList.remove("active");
            pressedAltGr = false;
            break;
          }
        }
      } else if (e.key == "Alt" && e.code == "AltLeft") {
        if (pressedAlt == false) {
        } else {
          if (e.code == symbols[i].code) {
            boxButton.classList.remove("active");
            pressedAlt = false;
            break;
          }
        }
      } else if (e.key == "Control") {
        if (e.code == symbols[i].code) {
          boxButton.classList.remove("active");
          break;
        }
      } else {
        for (let j = 0; j < symbols[i].all.length; j++) {
          if (e.key == symbols[i].all[j]) {
            boxButton.classList.remove("active");
            break;
          }
        }
      }
    }
  }
});
