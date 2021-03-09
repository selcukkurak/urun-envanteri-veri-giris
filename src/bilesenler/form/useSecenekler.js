import { useRecoilValue } from 'recoil'
import { anketlerState, birimlerState, idariKayitlarState, referanslarState, urunlerState } from '../store'
import { tekilBultenler } from '../store/selectors'
import { localSort } from '../util/sort'

export default function useSecenekler(){
  const periyotlar = useRecoilValue(referanslarState).PERIYOT
  const periyotOptions = periyotlar && periyotlar.map(duzey => ({ label: duzey.adi, value: duzey.id }))

  const cografiDuzeyler = useRecoilValue(referanslarState).COGRAFI_DUZEY
  const cografiDuzeyOptions = cografiDuzeyler && cografiDuzeyler.map(duzey => ({ label: duzey.adi, value: duzey.id }))

  const birimler = useRecoilValue(birimlerState)
  const birimOption = birimler && birimler.map(birim => ({label:birim.adi, value:birim.ustBirimId}))


  const veriDuzeyleri = useRecoilValue(referanslarState).VERI_DUZEYI
  const veriDuzeyiOption = veriDuzeyleri && veriDuzeyleri.map(duzey => ({ label: duzey.adi, value: duzey.id }))

  const verininTutulduguYerler = useRecoilValue(referanslarState).VERININ_TUTULDUGU_YER
  const veriTutulanYerOption = verininTutulduguYerler && verininTutulduguYerler.map(duzey => ({
    label: duzey.adi,
    value: duzey.id
  }))

  const transferFormatlari = useRecoilValue(referanslarState).VERI_KAYNAK_BICIMI
  const transferFormatiOption = transferFormatlari && transferFormatlari.map(duzey => ({
    label: duzey.adi,
    value: duzey.id
  }))
  const veriTalepBicimleri = useRecoilValue(referanslarState).VERI_TALEP_BICIMI
  const veriTalepBicimiOption = veriTalepBicimleri && veriTalepBicimleri.map(duzey => ({
    label: duzey.adi,
    value: duzey.id
  }))
  const veriBirimDuzeyleri = useRecoilValue(referanslarState).ISTATISTIKI_BIRIM_DUZEY
  const veriBirimDuzeyiOption = veriBirimDuzeyleri && veriBirimDuzeyleri.map(duzey => ({
    label: duzey.adi,
    value: duzey.id
  }))
  const kurumlar = useRecoilValue(referanslarState).KAYNAK_KURUM
  const kurumlarOption = kurumlar && kurumlar.map(duzey => ({
    label: duzey.adi,
    value: duzey.id
  }))

  const bultenler = useRecoilValue(tekilBultenler)
  const bultenOption = bultenler && bultenler.map(bulten => ({ label: bulten.adi, value: bulten.id }))

  const kuruluslar = useRecoilValue(referanslarState).KURULUS
  const kurulusOption = kuruluslar && kuruluslar.map(kurulus => ({ label: kurulus.adi, value: kurulus.id }))

  const araclar = useRecoilValue(referanslarState).ARAC
  const aracOption = araclar && araclar.map(arac => ({ label: arac.adi, value: arac.id }))

  const urunler = localSort(useRecoilValue(urunlerState), 'adi')
  const urunOption = urunler && urunler.map(urun => ({ label: urun.adi, value: urun.id }))

  console.log("urunler", useRecoilValue(urunlerState))

  const anketler = localSort(useRecoilValue(anketlerState), 'adi')
  const anketOption = anketler && anketler.map(anket => ({ label: anket.adi, value: anket.id }))

  const idariKayitlar = localSort(useRecoilValue(idariKayitlarState), 'adi')
  const kayitOption = idariKayitlar && idariKayitlar.map(kayit => ({ label: kayit.adi, value: kayit.id }))

  return {
    birimOption,
    periyotOptions,
    cografiDuzeyOptions,
    kayitOption,
    anketOption,
    veriTalepBicimiOption,
    urunOption,
    veriTutulanYerOption,
    veriBirimDuzeyiOption,
    transferFormatiOption,
    veriDuzeyiOption,
    kurumlarOption,
    bultenOption,
    aracOption,
    kurulusOption
  }
}
