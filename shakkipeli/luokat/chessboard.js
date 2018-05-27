'use strict';

let siirtoLaillinen = false;

module.exports = class Chessboard {
  constructor() {
    this.chessboard;
    this.wsyodyt = [];
    this.bsyodyt = [];
  }

  alusta(chessboard) {
    this.chessboard = chessboard;
    return this.chessboard;
  }

  siirra(alkuruutu, loppuruutu) {
    let alkusolu = this.chessboard[alkuruutu.rivi][alkuruutu.sarake];
    let loppusolu = this.chessboard[loppuruutu.rivi][loppuruutu.sarake];
    let alkurivi = alkuruutu.rivi;
    let loppurivi = loppuruutu.rivi;
    let alkusarake = alkuruutu.sarake;
    let loppusarake = loppuruutu.sarake;
    let rivikerroin;
    let sarakekerroin;
    let kirjain = this.chessboard[loppuruutu.rivi][loppuruutu.sarake].charAt(0);
    let akirjain = this.chessboard[alkuruutu.rivi][alkuruutu.sarake].charAt(0);
    let syontiLaillinen = false;

    if (alkusolu === 'tyhja') {
      siirtoLaillinen = false;
    } else if (alkusarake === loppusarake && alkurivi === loppurivi) {
      siirtoLaillinen = false;
    } else if (akirjain === 'b' && kirjain === 'b') {
      siirtoLaillinen = false;
    } else if (akirjain === 'w' && kirjain === 'w') {
      siirtoLaillinen = false;
    } else if (true) {
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


    if (siirtoLaillinen) {
      this.chessboard[loppuruutu.rivi][loppuruutu.sarake] = this.chessboard[alkuruutu.rivi][alkuruutu.sarake];
      this.chessboard[alkuruutu.rivi][alkuruutu.sarake] = 'tyhja';
      return true;
    } else {
      return false;
    }
  }

  returnTaulu() {
    if (this.chessboard) {
      return this.chessboard;
    } else {
      console.log('Taulu on tyhjä');
    }
  }

  onTyhja(ruutu) {
    return this.chessboard[ruutu.rivi][ruutu.sarake] === 'tyhja';
  }
}
