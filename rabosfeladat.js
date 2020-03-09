/**
*Ha feltételezzük, hogy az emberek akár végtelen ideig élnek, akkor:
* Tehát ha a validatoRab találkozik a lámpával, és az le van kapcsolva akkor nincs teendő, ha fel van kapcsolva, akkor megszámolja egyszer és lekapcsolja.
* Ha egy NEM validatorrRab találkozik a lámpával, és az fel van kapcsolva, akkor nincs teendője, de ha le van kapcsolva, akkor felkapcsolja, h a validatorRab meg tudja számolni.
* Sajnos nem jó így még, mert nincs megoldásom az első esetre, ha a lámpa a legeslegelső találkozáskor eleve felkapcsolt állapotban van, mert így elcsűszik egyel a számolás, és midnenki bentmarad...
*/

const validatorrRab;
const osszesTobbiRab = []; // 99 elemű tömb
let lampa = false // true= felkapcsolva, false= lekapcsolva.
let lampaennyiszerLettFelkapcsolva = 0;

if (validatorrRab) {
  if (lampa === true) {
    lampa = false;
    lampaennyiszerLettFelkapcsolva++;
  } else {
    lampa = false;
  }
}
if (osszesTobbiRab) {
  for (let i = 0; i < osszesTobbiRab.length; i++) {
    if (lampa === false) {
      lampa = true;
    } else {
      lampa = false;
    }
  }
}
