console.log(window.location.href);
const curLoc = window.location.href.split("/");
const tail = curLoc[curLoc.length - 1];
console.log(tail);

window.location.href = `../?${tail}`;
