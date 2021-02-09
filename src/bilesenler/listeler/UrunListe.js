import React from 'react'
import {localSort} from '../util/sort'
import {useRecoilValue} from 'recoil'
import { tumUrunlerState, urunlerState } from '../store'
import Liste from './Liste'
import sayfaIciGecis from '../hook/sayfaIciGecis'
import UrunEklemeForm from '../form/UrunEklemeForm'


const taslakDurum = [
  {adi:"Evet", durum:true},
  {adi:"Hayır", durum:false}
]
function UrunListe(){
  const [secili, setSecili] = React.useState(null)
  const urunler = localSort(useRecoilValue(urunlerState), 'adi')
  const tumUrunler = localSort(useRecoilValue(tumUrunlerState), 'adi')
  const taslakUrunler = tumUrunler.filter(urun => urun.taslak)
  const [
    eklemeSayfasi,
    handleEklemeSayfasiGecis,
    handleListeSayfaGecis
  ] = sayfaIciGecis();


  const handleSeciliTaslak = (event, secenek) => {
    if (!secili || secenek.durum !== secili.durum) {
      setSecili(secenek)
    }
    else {
      setSecili(null)
    }
  }
  if (eklemeSayfasi) return (<UrunEklemeForm handleListeSayfaGecis={handleListeSayfaGecis}/>)
  return(
    !eklemeSayfasi && (
      <Liste
        title={"İstatistiki Ürünler"}
        butonText={"Yeni İstatistiki Ürün Ekle"}
        dizi={tumUrunler}
        dizi1={urunler}
        dizi2={taslakUrunler}
        durumlar={taslakDurum}
        secili={secili}
        handleSeciliTaslak={handleSeciliTaslak}
        handleEklemeSayfasiGecis={handleEklemeSayfasiGecis}
      />
    )

  )
}

export default React.memo(UrunListe)