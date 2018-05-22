'use strict';

const Chessboard = require('./chessboard');

module.exports = class Peli {
  constructor(peliNumero, id) {
    this.peliNumero = peliNumero;
    this.omistaja = id;
    this.chessboard = new Chessboard();
    this.vuoro;
    this.pelaajat = [];
    // this.peli = [];
  }
  lisaa(pelaaja) {
    if (this.pelaajat.length === 0) {
      this.pelaajat.push(pelaaja);
      this.pelaajat[0].vari = 'white';
    } else {
      this.pelaajat.push(pelaaja);
      this.pelaajat[1].vari = 'black';
    }
  }
  poista(pelaaja){

  }
  taynna() {
    this.pelaajat.length == 2;
  }
}
