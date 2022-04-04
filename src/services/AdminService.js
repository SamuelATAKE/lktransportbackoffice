import httpClient from '../http-common';

class AdminService {
  getAdmins = () => {
    return httpClient.get('/administrateur');
  }

  // getAdminById(id) {
  //  return httpClient.get('/administrateur/${id}');
  // }

  addAdmin = (admin) => {
    return httpClient.post('/administrateur', admin);
  }

  updateAdmin = (admin) => {
    return httpClient.put('/administrateur', admin);
  }

  deleteAdmin = (admin) => {
    return httpClient.delete('/administrateur', admin);
  }
}
export default new AdminService();
