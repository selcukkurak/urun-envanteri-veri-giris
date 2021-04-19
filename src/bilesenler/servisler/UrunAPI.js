import Axios from 'axios'

class UrunAPI {
  baseUrl = '/api/urunler'

  urunEklemeIstek(urun) {
    return Axios.post(`${this.baseUrl}/yetkisiz`, urun)
  }

  urunGuncellemeIstek(urun, id) {
    return Axios.put(`${this.baseUrl}/guncelle/${id}`, urun)
  }
}

export default new UrunAPI();