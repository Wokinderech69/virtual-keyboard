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
}
full();

// let arrKeyBoard = [
//   96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 113, 119, 101, 114, 116,
//   121, 117, 105, 111, 112, 91, 93, 97, 115, 100, 102, 103, 104, 106, 107, 108,
//   59, 39, 92, 92, 122, 120, 99, 118, 98, 110, 109, 44, 46, 47, 32,
// ];

// function init() {
//   let out = "";
//   for (let i = 0; i < arrKeyBoard.length; i++) {
//     out +=
//       '<div class="key-board__button" >' +
//       String.fromCharCode(arrKeyBoard[i]) +
//       "</div>";
//   }
//   document.querySelector(".key-board").innerHTML = out;
// }
// init();

// // inputElement.addEventListener("keypress", function (event) {
// //   // console.log(event);
// //   arrKeyBoard.push(event.charCode);
// //   console.log(arrKeyBoard);
// // });

// document.querySelector("input").onkeypress = function (event) {
//   // console.log("keypress");
//   // console.log("chareCode:" + event.charCode);
//   // console.log("code:" + event.code);
//   // console.log("key:" + event.key);
//   // console.log("keyCode:" + event.keyCode);
//   // console.log(event);
//   // console.log("1");
//   console.log(arrKeyBoard);
// };

// document.querySelector("input").onkeydown = function (event) {
//   // console.log("keydown");
//   // console.log("chareCode:" + event.charCode);
//   // console.log("code:" + event.code);
//   // console.log("key:" + event.key);
//   // console.log("keyCode:" + event.keyCode);
//   // console.log(event);
//   // console.log("1");
//   // if (event.key == "CapsKock") {
//   //   document.querySelector("input").checked = true;
//   // } else {
//   //   document.querySelector("input").checked = false;
//   // }
//   // ! ========= вариант 1 ============
//   // // выполнения сочитаний клавиш(нажал - сработало, на удержании не работает, отпустил и нажал повторно - сработало)
//   // if (event.code == "AltLeft") flag = true;
//   // if (event.code == "KeyN" && flag) {
//   //   flag = false;
//   //   console.log("good");
//   // }
//   // ! ========= вариант 2 ============
//   // if (event.code == "AltLeft") {
//   //   document.onkeyup = function (event) {
//   //     if (event.code == "KeyN") {
//   //       console.log("good");
//   //     } else {
//   //       document.onkeyup = null;
//   //     }
//   //   };
//   // }
// };
// document.querySelector("input").onkeyup = function (event) {
//   // console.log("keyup");
//   // console.log("chareCode:" + event.charCode);
//   // console.log("code:" + event.code);
//   // console.log("key:" + event.key);
//   // console.log("keyCode:" + event.keyCode);
//   // console.log(event);
//   // console.log("1");
// };
