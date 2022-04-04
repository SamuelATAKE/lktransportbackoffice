import httpClient from '../http-common';

class TarifService {
  static getTarifs() {
    return httpClient.get('/tarif');
  }

  // getTarifById(id) {
  //  return httpClient.get('/tarif/${id}');
  // }

  static addTarif(tarif) {
    return httpClient.post('/tarif', tarif);
  }

  static updateTarif(tarif) {
    return httpClient.put('/tarif', tarif);
  }

  static deleteTarif(tarif) {
    return httpClient.delete('/tarif', tarif);
  }
}
export default new TarifService();
