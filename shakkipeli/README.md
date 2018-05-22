ruutujen laskeminen hiiren koordinaattien X ja Y pisteen laskemine/saaminen


function hiirenPaikka(kanvas, e){
    let ymparoivaSuorakaide=kanvas.getBoundingClientRect();
    return {
        x:e.clientX-ymparoivaSuorakaide.left,
        y:e.clientY-ymparoivaSuorakaide.top
    };
}

function hiirenPaikka(kanvas,e){
  let ymp=kanvas.getBoundingClientRect();
  let x=e.clientX-ymp.left-1;
  return Math.floor(x/30);
}

function valitseRuutu(e){
  soketti.emit('ruutuValittu',hiirenPaikka(piirtoalusta,e));
}

soketti.on('ruutuValittu', ruutu=>
  io.emit('piirra',{ruutu:ruutu, vari:kayttajat.get(soketti.id).vari})
);
