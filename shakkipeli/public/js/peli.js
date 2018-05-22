(function() {
  let errorlista;
  let canvas;
  let harmaa;
  let ctx;
  let socket;
  let kuvat = {};
  let alkuruutu = true;
  let kuvatLkm = 0;
  let laheta;
  let huoneenNimi;
  let pelaajanNimi;
  let pelitNumerot;
  let viestilista;
  let voiLahettaa = false;
  let li = document.createElement('li');
  // let shakkitaulu;
  let syodytPalat;

  document.addEventListener('DOMContentLoaded', lataaKuvat);
  socket = io();

  function alusta() {
    nimi = document.getElementById('nimi');
    viestilista = document.getElementById('errorlista');
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.addEventListener('click', ruudunValinta);
    draw();
    console.log('alustettu');
    socket.on('alustaTaulu', function(shakkitaulu){
      console.log('alusta taulu: ' + shakkitaulu);
      piirraKuvat(shakkitaulu);
    });
    // piirraKuvat();

    socket.on('laitonSiirto', (viesti, data) => {
      li.textContent = 'LAITON SIIRTO!';
      li.style.color = 'red';
      viestilista.appendChild(li);
      draw();
      // piirraKuvat(data);
    });

    socket.on('laillinenSiirto', (viesti, data, syodyt) => {
      li.textContent = 'Laillinen siirto';
      li.style.color = 'blue';
      viestilista.appendChild(li);
      draw();
      // piirraKuvat(data);
      syodytPalaset(syodyt);
    });

    socket.on('message', viesti => {
      li.textContent = viesti;
      viestilista.appendChild(li);
    });

  } //alusta päättyy

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffe9c0';
    ctx.fillRect(0, 0, canvas.height, canvas.width);
    for (i = 0; i < 8; i++) {
      for (j = 0; j < 8; j++) {
        ctx.moveTo(0, 60 * j);
        ctx.lineTo(480, 60 * j);
        ctx.moveTo(60 * i, 0);
        ctx.lineTo(60 * i, 480);
        let left = 0;
        for (let a = 0; a < 8; a++) {
          for (let b = 0; b < 8; b += 2) {
            startX = b * 60;
            if (a % 2 == 0) startX = (b + 1) * 60;
            ctx.fillStyle = '#c57d34';
            ctx.fillRect(startX + left, (a * 60), 60, 60);
          }
        }
      }
    }
  }

  function lataaKuvat() {
    for (let PIECE in PIECES) {
      kuvat[PIECE] = new Image(60, 60);
      kuvat[PIECE].src = PIECES[PIECE];
      kuvat[PIECE].onload = kuvatLadattu;
    }
  }

  function kuvatLadattu() {
    if (++kuvatLkm === 13) {
      console.log("Kuvat ladattu");
      alusta();
      alustaKeskustelu();
    }
  }

  function ruudunValinta(e) {
    if (alkuruutu === true) {
      let paikka = hiirenPaikka(canvas, e);
      socket.emit('alkuruutu', paikka);
      ctx.fillStyle = 'rgba(0, 115, 255, 0.35)';
      ctx.fillRect(paikka.sarake * 60, paikka.rivi * 60, 60, 60);
      alkuruutu = false;
    } else {
      socket.emit('loppuruutu', hiirenPaikka(canvas, e));
      alkuruutu = true;
    }
  }

  function syodytPalaset(syodytPalat) {
    for (let i = 0; i < syodytPalat.length; i++) {
      console.log(syodytPalat);
      ctx.drawImage(kuvat[syodytPalat[i]], 1000, 1000, 80, 80);
    }
  }

  function piirraKuvat(shakkilauta) {
    for (let i = 0; i < shakkilauta.length; i++) {
      for (let k = 0; k < shakkilauta[i].length; k++) {
        ctx.drawImage(kuvat[shakkilauta[i][k]], k * 60, (i * 60), 60, 60);
      }
    }
  }

  function hiirenPaikka(canvas, e) {
    let ymp = canvas.getBoundingClientRect();
    let x = e.clientX - ymp.left - 1;
    let y = e.clientY - ymp.top - 1;
    return {
      sarake: Math.floor(x / 60),
      rivi: Math.floor(y / 60)
    };
  }

  function alustaKeskustelu() {
    viestilista = document.getElementById('errorlista');
    let tekstiarea = document.getElementById('viesti');
    nimi = document.getElementById('nimi');
    let lu = document.createElement('li');
    let laheta = document.getElementById('laheta');
    console.log("Keskustelu alustettu");
    document.getElementById('laheta').addEventListener('click', lahetaViesti);
  }



  socket.on('uusiViesti', data => {
    let li = document.createElement('li');
    li.textContent = data;
    li.style.color = 'darkblue';
    viestilista.appendChild(li);
  });

  function lahetaViesti() {
    socket.emit('lahetaViesti', document.getElementById('viesti').value);
  }

})();
