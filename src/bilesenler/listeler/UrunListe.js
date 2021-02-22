import React from 'react'
import {localSort} from '../util/sort'
import {useRecoilValue} from 'recoil'
import { tumUrunlerState, urunlerState } from '../store'
import Liste from './Liste'


const taslakDurum = [
  {adi:"Evet", durum:true},
  {adi:"Hayır", durum:false}
]
export default function UrunListe({match}){
  const [secili, setSecili] = React.useState(null)
  const urunler = localSort(useRecoilValue(urunlerState), 'adi')
  const tumUrunler = localSort(useRecoilValue(tumUrunlerState), 'adi')
  const taslakUrunler = tumUrunler.filter(urun => urun.taslak)


  const handleSeciliTaslak = (event, secenek) => {
    if (!secili || secenek.durum !== secili.durum) {
      setSecili(secenek)
    }
    else {
      setSecili(null)
    }
  }
  return(
      <Liste
        title={"İstatistiki Ürünler"}
        butonText={"Yeni İstatistiki Ürün Ekle"}
        filtreLabel={"Onaylanmış Ürünleri Göster:"}
        dizi={tumUrunler}
        dizi1={urunler}
        dizi2={taslakUrunler}
        durumlar={taslakDurum}
        secili={secili}
        url={match.url}
        handleSeciliTaslak={handleSeciliTaslak}
        path={match.url + "/yeni-urun"}
      />
  )
}
