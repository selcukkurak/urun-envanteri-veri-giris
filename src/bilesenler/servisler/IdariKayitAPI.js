import Axios from 'axios'

class IdariKayitAPI {
  baseUrl = '/api/idari-kayitlar'

  kayitEklemeIstek(kayit){
    Axios.post(`${this.baseUrl}`, kayit)
  }

  kayitGuncellemeIstek(kayit, id){
    Axios.put(`${this.baseUrl}/guncelle/${id} `, kayit)
  }

  kayitTaslakYap(id){
    return Axios.put(`${this.baseUrl}/version/${id}`)
  }
}
export default new IdariKayitAPI();
