import Axios from 'axios'

class IdariKayitAPI {
  baseUrl = '/api/idari-kayitlar'

  kayitEklemeIstek(kayit){
    Axios.post(`${this.baseUrl}`, kayit)
  }
}
export default new IdariKayitAPI();
