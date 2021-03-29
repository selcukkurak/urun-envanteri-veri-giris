import { Bildirim } from './Bildirim'



export const hataMesajiYayinla = hata => Bildirim.show({
  message: hata || 'Hata Meydana Geldi!',
  icon: 'warning-sign',
  intent: 'danger'
})


export const basariMesajiYayinla = mesaj => Bildirim.show({
  message: mesaj || 'İşlem Başarılı',
  icon: 'tick',
  intent: 'success'
})
