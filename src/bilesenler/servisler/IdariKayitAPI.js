import Axios from 'axios'

class IdariKayitAPI {
  baseUrl = '/api/idari-kayitlar'

  kayitEklemeIstek(kayit){
    Axios.post(`${this.baseUrl}`, kayit)
  }

  kayitGuncellemeIstek(kayit, id){
    Axios.put(`${this.baseUrl}/guncelle/${id} `, kayit)
  }
}
export default new IdariKayitAPI();
