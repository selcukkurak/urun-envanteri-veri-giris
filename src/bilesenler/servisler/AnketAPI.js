import Axios from 'axios'

class AnketAPI {

  baseUrl = "/api/anketler"

  anketEklemeIstek(anket){
    Axios.post(`${this.baseUrl}/ekle`, anket)
  }
}

export default new AnketAPI();