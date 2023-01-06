console.log(window.location.href);
const curLocD = window.location.href.split("/");
localStorage.setItem("curlocD", window.location.href);
let tailD: string;
if (curLocD[curLocD.length - 2] === "product-detail") {
    tailD = `product-detail${curLocD[curLocD.length - 1]}`;
} else {
    tailD = curLocD[curLocD.length - 1];
}

console.log(tailD);

window.location.href = `../?${tailD}`;
