import httpClient from '../http-common';

class AdminService {
  static getAdmins() {
    return httpClient.get('/administrateur');
  }

  // getAdminById(id) {
  //  return httpClient.get('/administrateur/${id}');
  // }

  static addAdmin(admin) {
    return httpClient.post('/administrateur', admin);
  }

  static updateAdmin(admin) {
    return httpClient.put('/administrateur', admin);
  }

  static deleteAdmin(admin) {
    return httpClient.delete('/administrateur', admin);
  }
}
export default new AdminService();
