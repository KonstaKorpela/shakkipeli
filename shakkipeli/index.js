//SHAKKI SERVERI
'use strict';
let alkuruutu;
let peliNumero = 0;

const bodyparser = require('body-parser');
const sessio = require('express-session');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');
const mysql = require('mysql');

// const Chessboard = require('./luokat/chessboard');
const portti = process.env.PORT || 3000;
const host = '127.0.0.1';

const io = require('socket.io')(http);

const Peli = require('./luokat/peli');
const pelit = new Map();
const Pelaaja = require('./luokat/pelaaja');

const SQL = require('./Sql');
const SqlLauseet = new SQL;

const lisaaUusiHenkiloSql = "insert into user(EmailAddress, Firstname, Lastname, UserName, Password, elo, unranked) values (?,?,?,?,PASSWORD(?),1200,1200)";
const loginSql = "SELECT COUNT (UserName) AS LoginStatus FROM user WHERE UserName=? AND Password=PASSWORD(?)";
const uusipeliSql = "INSERT INTO game(location, white, shakkitaulu) VALUES (?,?,?)";
const uusinPeliID = "SELECT LAST_INSERT_ID() as id";
const haeKayttajaID = "SELECT userID FROM user WHERE UserName = ?";
const haeGameID = "SELECT gameID FROM game WHERE white = ?";
const tarkistaTunnukset = "SELECT COUNT(CASE WHEN UserName = ? THEN 1 END) AS uStatus, COUNT(CASE WHEN EmailAddress=? THEN 1 END) AS eStatus FROM user";
const haeShakkitaulu = "SELECT shakkitaulu FROM game WHERE gameID=?"

const ejs = require('ejs');

function jsonPromise(data) {
  return new Promise((resolve, reject) => {
    try {
      let muunnettu = JSON.parse(data);
      resolve(muunnettu);
    } catch (error) {
      reject('ei muunnettu: ' + error.message);
    }
  });
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
let template = fs.readFileSync(path.join(__dirname, 'views', 'pelihuone.ejs'), 'utf8');

app.use(bodyparser.urlencoded({
  extended: false
}));

app.use(bodyparser.json());

app.get('/', (req, res) => {
  if (req.body.username) {
    res.render('etusivuK', {
      nimi: req.session.nimi,
      status: "1" // = logged in
    });
  } else {
    res.render('etusivuEK', {
      nimi: "Et ole kirjautunut",
      status: "2" // not logged in
    });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
  res.render('login', {
    virhe: ""
  });
});

app.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.sendStatus(401);
  } else {
    let username = req.body.username;
    SqlLauseet.suoritaKysely(loginSql, username, req.body.password)
      .then(data => {
        (data[0].LoginStatus);
        if (data[0].LoginStatus === 1) {
          res.render('etusivuK', {
            nimi: username,
            status: "1" // = logged in
          });
          // res.redirect('/');
        } else {
          res.render('login', {
            virhe: "Väärä käyttäjätunnus/salasana"
          });
        }
      })
      .catch(err => res.render('login', {
        virhe: "Muu virhe"
      }));
  }
});


app.post('/uusipeli', (req, res) => {
  SqlLauseet.suoritaKysely(haeKayttajaID, req.body.username)
    .then(username => SqlLauseet.suoritaKysely(uusipeliSql, 'Helsinki', username[0].userID, '[["wRook","wKnight","wBishop","wKing","wQueen","wBishop","wKnight","wRook"],["wPawn","wPawn","wPawn","wPawn","wPawn","wPawn","wPawn","wPawn"],["tyhja","tyhja","tyhja","tyhja","tyhja","tyhja","tyhja","tyhja"],["tyhja","tyhja","tyhja","tyhja","tyhja","tyhja","tyhja","tyhja"],["tyhja","tyhja","tyhja","tyhja","tyhja","tyhja","tyhja","tyhja"],["tyhja","tyhja","tyhja","tyhja","tyhja","tyhja","tyhja","tyhja"],["bPawn","bPawn","bPawn","bPawn","bPawn","bPawn","bPawn","bPawn"],["bRook","bKnight","bBishop","bKing","bQueen","bBishop","bKnight","bRook"]]'))
    .then((data) => {
      res.render('pelihuone', {
        username: req.body.username,
        gameID: data.insertId,
        status: 200
      });
    })
    .catch(err => console.log(err.message));

});


app.get('/logout', (req, res) => {

});

app.get('/register', (req, res) => {
  if (req.body.username) {
    res.render('etusivuK', {
      status: 1,
      virhe: 'Olet jo kirjautunut sisään, jos haluat tehdä uuden käyttäjän kirjaudu ulos ensin.'
    });
  } else {
    res.render('register', {
      virhe: ''
    });
  }
});

app.post('/register', (req, res) => {
  SqlLauseet.suoritaKysely(tarkistaTunnukset, req.body.username, req.body.email)
    .then(register => {
      if (register[0].uStatus === 0 && register[0].eStatus === 0) {
        SqlLauseet.suoritaKysely(lisaaUusiHenkiloSql, req.body.email, req.body.firstname, req.body.lastname, req.body.username, req.body.password)
          .then(tulos => console.log('Affected rows:' + tulos.affectedRows))
          .catch(err => console.log("viesti: " + err.message));
        res.render('login', {
          virhe: 'Käyttäjä tehty onnistuneesti!'
        });
      } else {
        console.log(+register[0].uStatus + '---' + register[0].eStatus);
        res.render('register', {
          virhe: 'Username or email not available'
        });
      }
    })
    .catch(err => console.log('Tapahtui virhe: ' + err.message));
});


//Testimonitori
app.get('/monitori', (req, res) =>
  res.sendFile(path.join(__dirname, 'monitori.html'))
);

io.on('connection', socket => { //Connect to the server
  // if (peliNumero > 0) {
  //   for (let i = 1; i <= peliNumero; i++) {
  //     socket.emit('luotuPeli', i);
  //   }
  // }

  socket.on('liityPeliin', (liityNumero, nimi) => {
    socket.nimi = nimi;
    socket.numero = liityNumero;
    if (!pelit.get(+liityNumero).taynna()) {
      pelit.get(+liityNumero).lisaa(new Pelaaja(socket.nimi, socket.id));
      socket.emit('liittynyt');
      console.log(pelit.get(+liityNumero).pelaajat[0]);
      io.to(pelit.get(+liityNumero).pelaajat[0].id).emit('liittynyt');
    } else {
      socket.emit('pelitaynna');
    }
  });

  socket.on('peliLuotu', (username, gameID) => {
    SqlLauseet.suoritaKysely(haeShakkitaulu, gameID)
      .then(taulu => jsonPromise(taulu[0].shakkitaulu))
      .then(shakkitaulu => socket.emit('alustaTaulu', shakkitaulu))
      .catch(err => console.log('Virhe: ' + err.message));
  });

  socket.on('lahetaViesti', viesti =>
    io.emit('uusiViesti', `${viesti}`)
  );

  // socket.on('disconnect', () => { //When you refresh or disconnect
  //   if (pelit.size !== 0) {
  //     if (pelit.get(+socket.numero).omistaja === socket.id || pelit.get(+socket.numero).pelaajat[1].id === socket.id) {
  //       io.to(pelit.get(+socket.numero).pelaajat[0].id).emit('disconnected');
  //       io.to(pelit.get(+socket.numero).pelaajat[1].id).emit('disconnected');
  //       pelit.delete(+socket.numero);
  //     }
  //   }
  // });

  socket.on('alkuruutu', (data, username) => {
    // if (SqlLauseet.
    //   pelit.get(+socket.numero).chessboard.onTyhja(data) === false) {
    //   alkuruutu = data;
    // } else { //If the turn is *not* equal your color send a message saying it's not your turn
    //   io.send('Ei ole sinun vuoro.');
    // }
  });

  socket.on('loppuruutu', data => { //When you click the ending square
    if (pelit.get(+socket.numero).chessboard.siirra(alkuruutu, data)) { //If the move is legal
      io.emit('laillinenSiirto', 'Siirto onnistui', pelit.get(+socket.numero).chessboard.chessboard, pelit.get(+socket.numero).chessboard.bsyodyt);
    } else { //Else the move is illegal
      io.emit('laitonSiirto', 'Laiton siirto', pelit.get(+socket.numero).chessboard.chessboard);
    }
  });
});
http.listen(portti, host, () =>
  // eslint-disable no-console
  (`palvelin ${host} palvelee portissa ${portti}`));
// eslint-enable no-console
