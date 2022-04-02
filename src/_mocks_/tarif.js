import { faker } from '@faker-js/faker';
// import { sample } from 'lodash';
// utils
import TarifService from '../services/TarifService';

// ----------------------------------------------------------------------
const state = { admins: [] };

const tab = [];
const tab2 = [];
console.log('Start');
TarifService.getTarif().then((response) => {
  // tab.push(response.data);
  console.log('After push');
  console.log(JSON.stringify(response.data));
  response.data.forEach((element) => {
    console.log(element.depart);
    tab.push({
      id: element.id,
      depart: element.depart,
      destination: element.destination,
      prix: element.prix
    });
    tab2.push(tab);
  });
});
console.log('Les tarifs');

console.log(tab);
// for (const element of tab) {
//  console.log(element);
// }

console.log(tab2);
console.log('Display');
console.log(tab);
tab.forEach((element) => {
  console.log('cool');
  console.log(element);
});
console.log('Boucle');
Object.keys(tab).forEach((key) => {
  console.log([key, tab[key]]);
});
console.log('Fin Boucle');
const tarifs = [...tab].map((_, index) => ({
  id: tab[index].id,
  depart: tab[index].depart,
  destination: tab[index].lastName,
  prix: tab[index].number
}));

console.log('before export');
console.log(tab);
console.log(tab);
console.log(tarifs);
export { tab };
export default tarifs;
