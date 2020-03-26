const calcPosibility = (size) => {
  const winLines = [];
  for (let r = 0; r < size; r++) {
    const rLine = [];
    const cLine = [];
    for (let c = 0; c < size; c++) {
      rLine.push((r * size) + c);
      cLine.push(r + (c * size));
    }
    winLines.push(rLine);
    winLines.push(cLine);
  }
  winLines.push([0, 6, 12, 18, 24]);
  winLines.push([4, 8, 12, 16, 20]);

  return winLines;
};

const calcWinner = (winLines, player = 'X', board) => {
  let playerSquares = board.map((square, idx) => {
    if (square === player) {
      return idx;
    }
    return null;
  });
  playerSquares = playerSquares.filter(square => square !== null);
  const formatPlayerSquaresStr = playerSquares.join(' ');
  for (let i = 0; i < winLines.length; i++) {
    const line = winLines[i];
    const formatLineStr = line.join(' ');
    if (formatPlayerSquaresStr.includes(formatLineStr)) {
      return line;
    }
  }
  return null;
};

module.exports = { calcPosibility, calcWinner };