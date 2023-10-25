//declaring constants and variables
const x_hover = "x-hover";
const o_hover = "o-hover";
const cell = document.querySelectorAll("[data-cell]");
const n_cell = document.querySelector("[inf-cell]");
const x_npx = document.querySelector(".xnpx");
const o_npx = document.querySelector(".onpx");
const w_msg = document.querySelector("[w-msg]");
w_msg.addEventListener("click", rst);
const d_wmsg = document.querySelector("[d-wmsg]");
const s_trx = document.querySelector("[strx]");
s_trx.addEventListener("click", swap);
const r_set = document.querySelector("[rset]");
r_set.addEventListener("click", rset);
let x_count = 0;
let o_count = 0;
let currentUp;
let strx;
let claSs;
let latest;

//declaring winning combinations
const w_cbats = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//starting game
start();

//declaring start function to start or update the game
function start() {
  s_trx.style.display = "inline";
  claSs = latest == o_hover ? x_hover : o_hover;
  n_cell.innerHTML = latest == o_hover ?(`<b>&#12295</b> hover`).toUpperCase() : (`<b>&#10005</b> hover`).toUpperCase();
  x_npx.innerHTML = `&#10005;_npx: ${x_count}`;
  o_npx.innerHTML = `&#12295;_npx: ${o_count}`;
  cell.forEach((cell) => {
    cell.classList.remove(x_hover);
    cell.classList.remove(o_hover);
    cell.removeEventListener("click", handlrclick);
    cell.textContent = "";
    cell.addEventListener("click", handlrclick, { once: true });
  });
}

//declaring click event function
function handlrclick(e) {
  strx = false;
  const cell = e.target;
  claSs = claSs == o_hover ? x_hover : o_hover;
  n_cell.innerHTML =
    claSs == o_hover ? (`<b>&#10005</b> hover`).toUpperCase() : (`<b>&#12295</b> hover`).toUpperCase();
  s_trx.style.display = strx ? "inline" : "none";
  currentUp = claSs == o_hover ? "&#12295;" : "&#10005;";
  cell.classList.add(claSs);
  call(cell, currentUp);
  if (checkwin(claSs)) {
    latest=claSs
    d_wmsg.textContent = `npx ${claSs.toUpperCase()}`;
    w_msg.classList.add("show");
    x_count = claSs == x_hover ? x_count + 1 : x_count;
    o_count = claSs == o_hover ? o_count + 1 : o_count;
    start();
  } else if (n_draw()) {
    d_wmsg.textContent = `npx draw!`;
    w_msg.classList.add("show");
    latest = claSs == o_hover ? x_hover : o_hover;
    start();
  }
}

//manipulate data in cell
function call(cell, currentUp) {
  cell.innerHTML = currentUp;
}

//declaring function to return true if any winning combinations are formed by object node list or false if not
function checkwin(claSs) {
  return w_cbats.some((combination) => {
    return combination.every((index) => {
      return cell[index].classList.contains(claSs);
    });
  });
}

//declaring function to return true if all cell have classes x-hover or o-hover and no w_cbats are formed
function n_draw() {
  return [...cell].every((cell) => {
    return cell.classList.contains(x_hover) || cell.classList.contains(o_hover);
  });
}

//declaring function to swap turns before any data is manipulated in the cell
function swap() {
  claSs = claSs == x_hover ? o_hover : x_hover;
  n_cell.innerHTML =
    claSs == o_hover ? (`<b>&#10005</b> hover`).toUpperCase() : (`<b>&#12295</b> hover`).toUpperCase();
}

//declaring function to make message element visible
function rst() {
  w_msg.classList.remove("show");
}

function rset() {
  window.location.reload(true);
}