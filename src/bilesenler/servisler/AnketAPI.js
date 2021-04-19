import Axios from 'axios'

class AnketAPI {

  baseUrl = "/api/anketler"

  anketEklemeIstek(anket){
    Axios.post(`${this.baseUrl}/ekle`, anket)
  }

  enketGuncellemeIstek(anket, id){
    Axios.put(`${this.baseUrl}/guncelle/${id}`, anket)
  }
}

export default new AnketAPI();