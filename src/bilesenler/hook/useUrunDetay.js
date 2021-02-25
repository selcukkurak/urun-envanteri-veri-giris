import { useEffect, useState } from 'react'
import Axios from 'axios'

export default function useUrunDetay(seciliUrun){
  const [urunDetay, setUrunDetay] = useState(null)

  useEffect(() => {
    if (seciliUrun) {
      Axios.get(`/api/urunler/${seciliUrun}`)
        .then(res => setUrunDetay(res.data))
    }
  }, [seciliUrun])

  return urunDetay
}