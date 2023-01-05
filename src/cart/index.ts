console.log(window.location.href);
const curLoc = window.location.href.split("/");
localStorage.setItem("curloc", window.location.href);
let tail: string;
if (curLoc[curLoc.length - 2] === "cart") {
    tail = `cart${curLoc[curLoc.length - 1]}`;
} else {
    tail = curLoc[curLoc.length - 1];
}

console.log(tail);

window.location.href = `../?${tail}`;
