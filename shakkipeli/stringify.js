let shakki = [
  ['wRook', 'wKnight', 'wBishop', 'wKing', 'wQueen', 'wBishop', 'wKnight', 'wRook'],
  ['wPawn', 'wPawn', 'wPawn', 'wPawn', 'wPawn', 'wPawn', 'wPawn', 'wPawn'],
  ['tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja'],
  ['tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja'],
  ['tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja'],
  ['tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja'],
  ['bPawn', 'bPawn', 'bPawn', 'bPawn', 'bPawn', 'bPawn', 'bPawn', 'bPawn'],
  ['bRook', 'bKnight', 'bBishop', 'bKing', 'bQueen', 'bBishop', 'bKnight', 'bRook']
];

let strigifyShakki = JSON.stringify(shakki)
console.log(strigifyShakki);

console.log(JSON.parse(strigifyShakki));
