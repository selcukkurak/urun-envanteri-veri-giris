import Axios from 'axios'

class UrunAPI {
  baseUrl = '/api/urunler'

  urunEklemeIstek(urun) {
    return Axios.post(`${this.baseUrl}/yetkisiz`, urun)
  }
}

export default new UrunAPI();