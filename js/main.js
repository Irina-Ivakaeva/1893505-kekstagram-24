function getRandomInt(from, to) {
  let min = from;
  let max = to;
  if (to <= from) {
    min = to;
    max = from;
  }
  return Math.floor(Math.random() * (max - min)) + min;
}
getRandomInt(15, 90);

function checkLength(line, maxLength) {
  if (line.length === maxLength) {
    return true;
  }
  return false;
}
checkLength('abc', 3);
