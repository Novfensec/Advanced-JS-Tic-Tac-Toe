const x_hover = "x-hover";
const o_hover = "o-hover";
const cell = document.querySelectorAll("[data-cell]");
const n_cell = document.querySelector("[inf-cell]");
const x_npx = document.querySelector(".xnpx");
const o_npx = document.querySelector(".onpx");
const w_msg = document.querySelector(".w-msg");
const d_wmsg = document.querySelector("[d-wmsg]");
const s_trx = document.querySelector(".strx");
let x_count = 0;
let o_count = 0;
let currentUp;
let strx;
let claSs;
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
start()
function start() {
    strx = true;
    s_trx.style.display = "inline";
    claSs = o_hover;
    n_cell.textContent = x_hover.toUpperCase();
    x_npx.textContent = `X_npx: ${x_count}`;
    o_npx.textContent = `O_npx: ${o_count}`;

    cell.forEach((cell) => {
        cell.classList.remove(x_hover);
        cell.classList.remove(o_hover);
        cell.removeEventListener("click", handlrclick);
        cell.textContent = "";
        cell.addEventListener("click", handlrclick, { once: true });
    });
}
function handlrclick(e) {
    strx = false;
    const cell = e.target;
    claSs = claSs == o_hover ? x_hover : o_hover;
    n_cell.textContent = claSs == o_hover ? x_hover.toUpperCase() : o_hover.toUpperCase();
    s_trx.style.display = strx ? "inline" : "none";
    currentUp = claSs == o_hover ? "O" : "X";
    cell.classList.add(claSs);
    call(cell, currentUp);
    if (checkwin(claSs)) {
        d_wmsg.textContent = `npx ${claSs.toUpperCase()}`;
        w_msg.classList.add("show");
        x_count = claSs == x_hover ? x_count + 1 : x_count;
        o_count = claSs == o_hover ? o_count + 1 : o_count;
        start();
    } else if (n_draw()) {
        d_wmsg.textContent = `npx draw!`;
        w_msg.classList.add("show");
        start();
    }
}
function call(cell, currentUp) {
    cell.textContent = currentUp;
}
function checkwin(claSs) {
    return w_cbats.some((combination) => {
        return combination.every((index) => {
            return cell[index].classList.contains(claSs);
        });
    });
}
function n_draw() {
    return [...cell].every((cell) => {
        return cell.classList.contains(x_hover) || cell.classList.contains(o_hover);
    });
}
function swap() {
    claSs = claSs == x_hover ? o_hover : x_hover;
    n_cell.textContent = claSs == o_hover ? x_hover.toUpperCase() : o_hover.toUpperCase();
}
function rst() {
    w_msg.classList.remove("show");
}
