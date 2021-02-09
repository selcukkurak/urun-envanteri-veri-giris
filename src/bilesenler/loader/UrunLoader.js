import { useEffect } from 'react'
import Axios from 'axios'
import {tumUrunlerState, urunlerState } from '../store'
import {keyBy, uniqBy} from 'lodash'
import { useSetRecoilState } from 'recoil'


const urunlerReq = Axios.get('/api/urunler')


async function tumUrunleriGetir(){
  const urunler = (await urunlerReq).data

  return urunler
}

async function urunleriGetir () {

  const sayilarReq = Axios.get('/api/urunler/sayilar')
  const kaynakKurumlarReq = Axios.get('/api/urunler/kaynak-kurumlar')
  const paylasimlarReq = Axios.get("/api/urunler/kuruluslar")
  const idariKayitlarReq = Axios.get('/api/urunler/idari-kayitlar')
  const anketlerReq = Axios.get('/api/urunler/anketler')
  const [urunler, sayilar, kurumlar, paylasimlar, idariKayitlar, anketler] = await Axios
      .all([urunlerReq, sayilarReq, kaynakKurumlarReq, paylasimlarReq, idariKayitlarReq, anketlerReq])

  const sayilarById = keyBy(sayilar.data, 'id')
  const kurumlarById = keyBy(kurumlar.data, 'id')
  const kuruluslarById = keyBy(paylasimlar.data, 'id')
  const idariKayitlarById = keyBy(idariKayitlar.data, 'id')
  const anketlerById = keyBy(anketler.data, 'id')

  return urunler.data
    .filter(urun => !urun.taslak)
    .map(urun => ({
      ...urun,
      anketler:anketlerById[urun.id].anketIdler,
      idariKayitlar:idariKayitlarById[urun.id].idariKayitIdler,
      sayilar: sayilarById[urun.id],
      kurumlar: kurumlarById[urun.id].kurumlar,
      kurulus: uniqBy(kuruluslarById[urun.id].paylasimlar.map(p => p.kurulus), 'id')
     }))
}

function UrunLoader () {
  const setUrunler = useSetRecoilState(urunlerState)
  const setTumUrunler = useSetRecoilState(tumUrunlerState)
  useEffect(() => {
    urunleriGetir().then(response => setUrunler(response))
  }, [setUrunler])
  useEffect(() => {
    tumUrunleriGetir().then(res => setTumUrunler(res))
  },[setTumUrunler])
  return null
}

export default UrunLoader
