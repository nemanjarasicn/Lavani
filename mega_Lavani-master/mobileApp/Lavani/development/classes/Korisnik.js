export default class Korisnik {
  constructor(ID, IME, PREZIME, ENTITET_IDS, PRAVA_IDS, REGION_ID) {
    this.id = ID;
    this.ime = IME;
    this.prezime = PREZIME;
    this.entiteti = ENTITET_IDS;
    this.prava = PRAVA_IDS;
    this.region_id = REGION_ID;
  }

  getFullName() {
    return this.ime + ' ' + this.prezime;
  }

  imaPravo(pravo) {
    return this.prava.includes(pravo) ? true : false;
  }
}
