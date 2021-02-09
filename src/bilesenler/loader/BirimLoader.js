import { useEffect } from 'react'
import Axios from 'axios'
import { turkishTitleCase } from '@tuik/util'
import { birimlerState } from '../store'
import { useSetRecoilState } from 'recoil'

function birimAdiKucult (birim) {
  return {
    ...birim,
    adi: turkishTitleCase(birim.adi)
  }
}

function BirimLoader () {
  const setBirimler = useSetRecoilState(birimlerState)

  useEffect(() => {
    Axios.get('/api/birimler')
      .then(response => setBirimler(response.data.map(birimAdiKucult)))
  }, [setBirimler])

  return null
}

export default BirimLoader
