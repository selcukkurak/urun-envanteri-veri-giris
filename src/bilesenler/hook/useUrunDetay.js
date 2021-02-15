import { useEffect, useState } from 'react'
import Axios from 'axios'

export default function useUrunDetay(seciliUrun){
  const [urunDetay, setUrunDetay] = useState(null)

  useEffect(() => {
    if (seciliUrun !== null) {
      Axios.get(`/api/urunler/${seciliUrun}`)
        .then(res => setUrunDetay(res.data))
    }
  }, [seciliUrun])

  return urunDetay
}