import httpClient from '../http-common';

class TarifService {
  getTarifs = () => {
    return httpClient.get('/tarif');
  }

  // getTarifById(id) {
  //  return httpClient.get('/tarif/${id}');
  // }

  addTarif = (tarif) => {
    return httpClient.post('/tarif', tarif);
  }

  updateTarif = (tarif) => {
    return httpClient.put('/tarif', tarif);
  }

  deleteTarif = (tarif) => {
    return httpClient.delete('/tarif', tarif);
  }
}
export default new TarifService();
