'use strict';

module.exports = class Chessboard {
  constructor() {
    this.chessboard = [
      ['wRook', 'wKnight', 'wBishop', 'wKing', 'wQueen', 'wBishop', 'wKnight', 'wRook'],
      ['wPawn', 'wPawn', 'wPawn', 'wPawn', 'wPawn', 'wPawn', 'wPawn', 'wPawn'],
      ['tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja'],
      ['tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja'],
      ['tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja'],
      ['tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja'],
      ['bPawn', 'bPawn', 'bPawn', 'bPawn', 'bPawn', 'bPawn', 'bPawn', 'bPawn'],
      ['bRook', 'bKnight', 'bBishop', 'bKing', 'bQueen', 'bBishop', 'bKnight', 'bRook']
    ];
    this.wsyodyt = [];
    this.bsyodyt = [];
  }

  siirra(alkuruutu, loppuruutu) { //alkuruutu = starting position & loppuruutu = ending position
    let alkusolu = this.chessboard[alkuruutu.rivi][alkuruutu.sarake];
    let loppusolu = this.chessboard[loppuruutu.rivi][loppuruutu.sarake];
    let alkurivi = alkuruutu.rivi //this.chessboard[alkuruutu.rivi];
    let loppurivi = loppuruutu.rivi //this.chessboard[loppuruutu.rivi];
    let alkusarake = alkuruutu.sarake //this.chessboard[alkuruutu.sarake];
    let loppusarake = loppuruutu.sarake //this.chessboard[loppuruutu.sarake];
    let siirtoLaillinen = false;
    let rivikerroin;
    let sarakekerroin;
    let kirjain = loppusolu.charAt(0);
    let akirjain = alkusolu.charAt(0);
    let testi = true;
    let syontiLaillinen = false;

    if (alkusolu === 'tyhja') {
      siirtoLaillinen = false;
    } else if (alkusarake === loppusarake && alkurivi === loppurivi) {
      siirtoLaillinen = false;
    } else if (akirjain === 'b' && kirjain === 'b') {
      siirtoLaillinen = false;
    } else if (akirjain === 'w' && kirjain === 'w') {
      siirtoLaillinen = false;
    } else if (testi) {
      switch (alkusolu) {
        case 'wKnight':
        case 'bKnight':
          if ((Math.abs(alkusarake - loppusarake) === 2) && (Math.abs(alkurivi - loppurivi) === 1)) {
            siirtoLaillinen = true;
          } else if ((Math.abs(alkusarake - loppusarake) === 1) && (Math.abs(alkurivi - loppurivi) === 2)) {
            siirtoLaillinen = true;
          }
          if (akirjain === 'b' && siirtoLaillinen && kirjain === 'w') {
            this.wsyodyt.push([this.chessboard[loppuruutu.rivi][loppuruutu.sarake]]);
            this.chessboard[loppuruutu.rivi][loppuruutu.sarake] = 'tyhja';
          } else if (akirjain === 'w' && siirtoLaillinen && kirjain === 'b') {
            this.bsyodyt.push([this.chessboard[loppuruutu.rivi][loppuruutu.sarake]]);
            this.chessboard[loppuruutu.rivi][loppuruutu.sarake] = 'tyhja';
          }
          break;
        case 'wBishop':
        case 'bBishop':
          if (Math.abs(alkurivi - loppurivi) === Math.abs(alkusarake - loppusarake)) {
            siirtoLaillinen = true;
          }
          if (alkurivi - loppurivi >= 0 && alkusarake - loppusarake <= 0) {
            rivikerroin = -1;
            sarakekerroin = +1;
          } else if (alkurivi - loppurivi >= 0 && alkusarake - loppusarake >= 0) {
            rivikerroin = -1;
            sarakekerroin = -1;
          } else if (alkurivi - loppurivi <= 0 && alkusarake - loppusarake <= 0) {
            rivikerroin = +1;
            sarakekerroin = +1;
          } else if (alkurivi - loppurivi <= 0 && alkusarake - loppusarake >= 0) {
            rivikerroin = +1;
            sarakekerroin = -1;
          }
          for (let i = 1; i < Math.abs(alkurivi - loppurivi); i++) {
            if (this.chessboard[alkuruutu.rivi + rivikerroin * i][alkuruutu.sarake + sarakekerroin * i] !== 'tyhja') {
              siirtoLaillinen = false;
            }
          }
          // for (let i = 1; i < Math.abs(loppusarake - alkusarake); i++) {
          //   if (this.chessboard[alkuruutu.rivi + rivikerroin * i][alkuruutu.sarake + sarakekerroin * i] === 'tyhja') {
          //     siirtoLaillinen = false;
          //   }
          // }
          // for (let i = 1; i < Math.abs(loppurivi - alkurivi); i++) {
          //   if (this.chessboard[alkuruutu.rivi + rivikerroin * i][alkuruutu.sarake + sarakekerroin * i] === 'tyhja') {
          //     siirtoLaillinen = false;
          //   }
          // }
          if (akirjain === 'b' && siirtoLaillinen && kirjain === 'w') {
            this.wsyodyt.push([this.chessboard[loppuruutu.rivi][loppuruutu.sarake]]);
            this.chessboard[loppuruutu.rivi][loppuruutu.sarake] = 'tyhja';
          } else if (akirjain === 'w' && siirtoLaillinen && kirjain === 'b') {
            this.bsyodyt.push([this.chessboard[loppuruutu.rivi][loppuruutu.sarake]]);
            this.chessboard[loppuruutu.rivi][loppuruutu.sarake] = 'tyhja';
          }
          break;
        case 'wPawn':
          if (alkurivi - loppurivi === -1 && Math.abs(alkusarake - loppusarake) === 1 && loppusolu !== 'tyhja' && kirjain === 'b') {
            siirtoLaillinen = true;
            this.bsyodyt.push([this.chessboard[loppuruutu.rivi][loppuruutu.sarake]]);
            this.chessboard[loppuruutu.rivi][loppuruutu.sarake] = 'tyhja';
          }

          if (akirjain === 'w' && kirjain === 'b' && alkusarake === loppusarake) {
            siirtoLaillinen = false;
          } else if (alkurivi - loppurivi === 1) {
            siirtoLaillinen = false;
            console.log("Et voi liikkua taaksepäin");
          } else if (alkurivi === 1 && Math.abs(loppurivi - alkurivi) === 2 && alkusarake === loppusarake) {
            siirtoLaillinen = true;
          } else if (loppurivi - alkurivi === 1 && alkusarake === loppusarake) {
            siirtoLaillinen = true;
          }
          if (alkurivi - loppurivi === -1 && Math.abs(alkusarake - loppusarake) === 1) {
            syontiLaillinen = true;
          }
          //  }
          break;
        case 'bPawn':
          if (alkurivi - loppurivi === 1 && Math.abs(alkusarake - loppusarake) === 1 && loppusolu !== 'tyhja' && kirjain === 'w') {
            siirtoLaillinen = true;
            this.wsyodyt.push([this.chessboard[loppuruutu.rivi][loppuruutu.sarake]]);
            this.chessboard[loppuruutu.rivi][loppuruutu.sarake] = 'tyhja';
          }
          if (akirjain === 'b' && kirjain === 'w' && alkusarake === loppusarake) {
            siirtoLaillinen = false;
          } else if (alkurivi - loppurivi === -1) {
            siirtoLaillinen = false;
            console.log("Et voi liikkua taaksepäin");
          } else if (alkurivi === 6 && Math.abs(loppurivi - alkurivi) === 2 && alkusarake === loppusarake) {
            siirtoLaillinen = true;
          } else if (loppurivi - alkurivi === -1 && alkusarake === loppusarake) {
            siirtoLaillinen = true;
          }
          break;
        case 'wPawn':
        case 'bPawn':
          if (loppurivi - alkurivi > 0) {
            rivikerroin = +1;
            sarakekerroin = +0;
          } else if (loppurivi - alkurivi < 0) {
            rivikerroin = -1;
            sarakekerroin = +0;
          } else if (alkurivi - loppurivi > 0 && alkusarake - loppusarake < 0) {
            rivikerroin = -1;
            sarakekerroin = +1;
          } else if (alkurivi - loppurivi > 0 && alkusarake - loppusarake > 0) {
            rivikerroin = -1;
            sarakekerroin = -1;
          } else if (alkurivi - loppurivi < 0 && alkusarake - loppusarake < 0) {
            rivikerroin = +1;
            sarakekerroin = +1;
          } else if (alkurivi - loppurivi < 0 && alkusarake - loppusarake > 0) {
            rivikerroin = +1;
            sarakekerroin = -1;
          }
          for (let i = 1; i < 2; i++) {
            if (this.chessboard[alkuruutu.rivi + rivikerroin][alkuruutu.sarake * sarakekerroin] !== 'tyhja') {
              siirtoLaillinen = false;
            }
          }

        case 'wKing':
        case 'bKing':
          if (Math.abs(loppurivi - alkurivi) === 1 && Math.abs(loppusarake - alkusarake) === 1) {
            siirtoLaillinen = true;
          } else if (Math.abs(loppurivi - alkurivi) === 1 && alkusarake === loppusarake) {
            siirtoLaillinen = true;
          } else if (Math.abs(loppusarake - alkusarake) === 1 && alkurivi === loppurivi) {
            siirtoLaillinen = true;
          }
          if (akirjain === 'b' && siirtoLaillinen && kirjain === 'w') {
            this.wsyodyt.push([this.chessboard[loppuruutu.rivi][loppuruutu.sarake]]);
            this.chessboard[loppuruutu.rivi][loppuruutu.sarake] = 'tyhja';
          } else if (akirjain === 'w' && siirtoLaillinen && kirjain === 'b') {
            this.bsyodyt.push([this.chessboard[loppuruutu.rivi][loppuruutu.sarake]]);
            this.chessboard[loppuruutu.rivi][loppuruutu.sarake] = 'tyhja';
          }
          break;

        case 'wQueen':
        case 'bQueen':
          if (Math.abs(alkurivi - loppurivi) === Math.abs(alkusarake - loppusarake)) { //Vino siirto
            siirtoLaillinen = true;
          } else if (Math.abs(alkusarake - loppusarake) === 0 || Math.abs(alkurivi - loppurivi) === 0) {
            siirtoLaillinen = true;
          }
          //jos L on laillinen tarkistetaan kaikki suunnat mihin kuningatar voi mennä
          if (alkurivi - loppurivi > 0 && alkusarake - loppusarake < 0) {
            rivikerroin = -1;
            sarakekerroin = +1;
          } else if (alkurivi - loppurivi > 0 && alkusarake - loppusarake > 0) {
            rivikerroin = -1;
            sarakekerroin = -1;
          } else if (alkurivi - loppurivi < 0 && alkusarake - loppusarake < 0) {
            rivikerroin = +1;
            sarakekerroin = +1;
          } else if (alkurivi - loppurivi < 0 && alkusarake - loppusarake > 0) {
            rivikerroin = +1;
            sarakekerroin = -1;
          } else if (loppusarake === alkusarake && loppurivi - alkurivi >= 0) {
            rivikerroin = +1;
            sarakekerroin = 0;
          } else if (loppusarake === alkusarake && loppurivi - alkurivi <= 0) {
            rivikerroin = -1;
            sarakekerroin = 0;
          } else if (loppusarake - alkusarake >= 0 && loppurivi === alkurivi) {
            rivikerroin = 0;
            sarakekerroin = +1;
          } else if (loppusarake - alkusarake <= 0 && loppurivi === alkurivi) {
            rivikerroin = 0;
            sarakekerroin = -1;
          }
          for (let i = 1; i < Math.abs(alkurivi - loppurivi); i++) {
            if (this.chessboard[alkuruutu.rivi + rivikerroin * i][alkuruutu.sarake + sarakekerroin * i] !== 'tyhja') {
              siirtoLaillinen = false;
              console.log("Matka ruutuun ei ollut tyhjä");
            }
          }
          for (let i = 1; i < Math.abs(loppusarake - alkusarake); i++) {
            if (this.chessboard[alkuruutu.rivi + rivikerroin * i][alkuruutu.sarake + sarakekerroin * i] !== 'tyhja') {
              siirtoLaillinen = false;
              console.log("Laiton siirto");
            }
          }
          for (let i = 1; i < Math.abs(loppurivi - alkurivi); i++) {
            if (this.chessboard[alkuruutu.rivi + rivikerroin * i][alkuruutu.sarake + sarakekerroin * i] !== 'tyhja') {
              siirtoLaillinen = false;
            }
          }
          if (akirjain === 'b' && siirtoLaillinen && kirjain === 'w') {
            this.wsyodyt.push([this.chessboard[loppuruutu.rivi][loppuruutu.sarake]]);
            this.chessboard[loppuruutu.rivi][loppuruutu.sarake] = 'tyhja';
          } else if (akirjain === 'w' && siirtoLaillinen && kirjain === 'b') {
            this.bsyodyt.push([this.chessboard[loppuruutu.rivi][loppuruutu.sarake]]);
            this.chessboard[loppuruutu.rivi][loppuruutu.sarake] = 'tyhja';
          }
          break;

        case 'wRook':
        case 'bRook':
          if (Math.abs(alkusarake - loppusarake) === 0 || Math.abs(alkurivi - loppurivi) === 0) {
            siirtoLaillinen = true;
          }
          if (siirtoLaillinen) {
            if (loppusarake === alkusarake && loppurivi - alkurivi >= 0) {
              rivikerroin = +1;
              sarakekerroin = 0;
            } else if (loppusarake === alkusarake && loppurivi - alkurivi <= 0) {
              rivikerroin = -1;
              sarakekerroin = 0;
            } else if (loppusarake - alkusarake >= 0 && loppurivi === alkurivi) {
              rivikerroin = 0;
              sarakekerroin = +1;
            } else if (loppusarake - alkusarake <= 0 && loppurivi === alkurivi) {
              rivikerroin = 0;
              sarakekerroin = -1;
            }

            for (let i = 1; i < Math.abs(loppurivi - alkurivi); i++) {
              if (this.chessboard[alkuruutu.rivi + rivikerroin * i][alkuruutu.sarake + sarakekerroin * i] !== 'tyhja') {
                siirtoLaillinen = false;
              }
            }
            for (let i = 1; i < Math.abs(loppusarake - alkusarake); i++) {
              if (this.chessboard[alkuruutu.rivi + rivikerroin * i][alkuruutu.sarake + sarakekerroin * i] !== 'tyhja') {
                siirtoLaillinen = false;
              }
            }
          }
          if (akirjain === 'b' && siirtoLaillinen && kirjain === 'w') {
            this.wsyodyt.push([this.chessboard[loppuruutu.rivi][loppuruutu.sarake]]);
            this.chessboard[loppuruutu.rivi][loppuruutu.sarake] = 'tyhja';
          } else if (akirjain === 'w' && siirtoLaillinen && kirjain === 'b') {
            this.bsyodyt.push([this.chessboard[loppuruutu.rivi][loppuruutu.sarake]]);
            this.chessboard[loppuruutu.rivi][loppuruutu.sarake] = 'tyhja';
          }
          break;

      }
    }
    console.log(this.bsyodyt, this.wsyodyt);
    if (siirtoLaillinen) {
      this.chessboard[loppuruutu.rivi][loppuruutu.sarake] = this.chessboard[alkuruutu.rivi][alkuruutu.sarake];
      this.chessboard[alkuruutu.rivi][alkuruutu.sarake] = 'tyhja';
      return true;
    } else {
      return false;
    }
  }

  resetTaulu() {
    this.chessboard = [
      ['wRook', 'wKnight', 'wBishop', 'wKing', 'wQueen', 'wBishop', 'wKnight', 'wRook'],
      ['wPawn', 'wPawn', 'wPawn', 'wPawn', 'wPawn', 'wPawn', 'wPawn', 'wPawn'],
      ['tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja'],
      ['tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja'],
      ['tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja'],
      ['tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja', 'tyhja'],
      ['bPawn', 'bPawn', 'bPawn', 'bPawn', 'bPawn', 'bPawn', 'bPawn', 'bPawn'],
      ['bRook', 'bKnight', 'bBishop', 'bKing', 'bQueen', 'bBishop', 'bKnight', 'bRook']
    ];
  }
  onTyhja(ruutu) {
    return this.chessboard[ruutu.rivi][ruutu.sarake] === 'tyhja';
  }
}
