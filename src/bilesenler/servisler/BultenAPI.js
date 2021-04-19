import Axios from 'axios'

class BultenAPI {
  baseUrl = '/api/yeni-bultenler'

  bultenEklemeIstek(anket){
    Axios.post(`${this.baseUrl}`, anket)
  }
}
export default new BultenAPI();