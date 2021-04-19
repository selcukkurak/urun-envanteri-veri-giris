import Axios from 'axios'

class BultenAPI {
  baseUrl = '/api/yeni-bultenler'

  bultenEklemeIstek(bulten){
    Axios.post(`${this.baseUrl}`, bulten)
  }

  bultenGuncellemeIstek(bulten, id){
    Axios.put(`${this.baseUrl}/guncelle/${id}`, bulten)
  }
}
export default new BultenAPI();