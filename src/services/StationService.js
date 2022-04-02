import httpClient from '../http-common';

class StationService {
  getStations() {
    return httpClient.get('/station');
  }

  getStationById(id) {
    return httpClient.get('/station/${id}');
  }

  addStation(station) {
    return httpClient.post('/station', station);
  }

  updateStation(station) {
    return httpClient.put('/station', station);
  }

  deleteStation(station) {
    return httpClient.delete('/station', station);
  }
}
export default new StationService();
