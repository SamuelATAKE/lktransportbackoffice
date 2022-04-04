import httpClient from '../http-common';

class StationService {
  static getStations() {
    return httpClient.get('/station');
  }

  // getStationById(id) {
  //  return httpClient.get('/station/${id}');
  // }

  static addStation(station) {
    return httpClient.post('/station', station);
  }

  static updateStation(station) {
    return httpClient.put('/station', station);
  }

  static deleteStation(station) {
    return httpClient.delete('/station', station);
  }
}
export default new StationService();
