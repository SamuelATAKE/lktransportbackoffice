import { faker } from '@faker-js/faker';
// import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';
import app from '../config';

// ----------------------------------------------------------------------

const tab = [];
app
  .database()
  .ref()
  .child('/users')
  .on('value', (snapshot) => {
    if (snapshot.val() !== null) {
      console.log('Snapshots');
      // console.log(snapshot.val().key);
      // tab.push(snapshot.val());
      snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.key);
        console.log(childSnapshot.val());
        // ...
        tab.push(childSnapshot.val());
      });
    } else {
      tab.push();
    }
  });

console.log(tab);

const admins = [...tab].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  firstName: tab[index].firstName,
  lastName: tab[index].lastName,
  number: tab[index].number,
  email: tab[index].email,
  station: tab[index].station,
  password: tab[index].password
}));

console.log('before export');
console.log(tab);
console.log(tab);
console.log(admins);
export { tab };
export default admins;
