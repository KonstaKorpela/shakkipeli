<!-- jos alkuruutu on sama kuin loppuruutu älä tee mitään; -->
jos loppuruudussa on kuningas tulee shakki eikä tehdä siirtoa ja canvasin sivuun tulee huomautus shakki;
jos siirto on laillinen siirrä nappula alkuruudusta loppuruutuun ja jos loppuruudussa on vastustajan nappula syö se;
jos siirto on laiton nappula pysyy samassa paikassa ja canvasin sivuun tulee huomautus laittomasta siirrosta;
jos pelaaja koittaa siirtää nappulan loppuruutuun jossa on oma nappula ei tapahdu siirtoa ja canvasin sivuun tulee huomautus laittomasta siirrosta;
jos nappula syödään nappula laitetaan sivuun syötyjen joukkoon(taulukkoon).

siirron jälkeen palvelin lähettää pelaajille päivitetyn taulukon sen jälkeen selain piirtää uuden "laudan" canvakselle.



sotilas:  
  lailliset siirrot:  
    liikkumissuunta on ylöspäin
    syöntisuunta on vinoon
    voi liikkua 1 ruudun ylöspäin paitsi jos sitä liikutetaan ensimmäisen kerran jolloin sitä voi siirtää 2 ruutua ylöspäin
    voi syödä vinoon jos vastustajan nappula on yhden ruudun päässä sotilaasta
    jos sotilas pääsee vastustajan puolen viimeeseen ruutuun se voi vaihtaa itsensä kuningattareen 
  laittomat siirrot:  
    ei voi liikuuttaa pystysuorassa toisen päälle ja syödä
    ei voi liikuttaa vaakasuorassa
    ei voi liikuttaa vinoon
    ei voi liikuttaa alaspain

torni:  
  lailliset siirrot:  
    voi liikuuttaa joko pystysuorassa tai vaakasuorassa niin monta ruutua kunnes reuna, vastustaja tai oma nappula tulee vastaan
    syönti tapahtuu liikuttamalla pysty- tai vaakasuorassa vastustajan nappulan päälle

  laittomat siirrot:
    ei voi liikuttaa vinoon
    ei "hypätä" nappuloiden päältä t.heikki
    ei voi mennä omien nappuloiden päältä
    ei voi syödä vinoon

hevonen:
    lailliset siirrot:
      hevonen liikkuu kaksi saraketta sivuun ja yhden rivin ylös- tai alaspäin tai se liikkuu kaksi rivi ylös- tai alaspäin ja yhden sarakkeen sivuun
      voi hypätä oman takaa
      syönti tapahtuu jos loppuruutu on vastustajan nappulan kohdalla

    laittomat siirrot:
      hevonen ei saa liikkua vinoon, pystysuooraan, vaakasuoraa, yhtä ruutua tai monta ruutua
      ei voi hypätä oman päälle


lähetti:
      lailliset siirrot:
        voi liikkua vinoon
        voi liikkua joko yhden tai monta ruutua
        voi syödä vinoon

      laittomat siirrot:
        ei voi liikkua pysty- tai vaakasuoraan
        ei voi mennä omien nappuloiden yli

kuningas:
        lailliset siirrot:
          voi liikkua yhden ruudun mihin tahansa suuntaan missä sitä ei voida syödä
          voi syödä mihin tahansa suuntaan

        laittomat siirrot:
          ei voi liikkua niin että vastustaja voi syödä sen kunnes on shakkimatti
          ei voi liikkua enemmän kun yhden ruudun
          ei voi hypätä oman nappulan päältä

kuningatar:
          lailliset siirrot:
            voi liikkua mihin tahansa suuntaan(pysty-, vaaka- ja vinosuunnassa) niin monta ruutua kun haluaa
            voi syödä mihin tahansa suuntaan
          laittomat siirrot:
            ei voi hypätä oman nappulan päältä
