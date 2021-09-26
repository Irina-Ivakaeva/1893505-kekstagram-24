function getRandomInt(from, to) {
  let min = from;
  let max = to;
  if (to <= from) {
    min = to;
    max = from;
  }
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkLength(line, maxLength) {
  if (line.length === maxLength) {
    return true;
  }
  return false;
}
