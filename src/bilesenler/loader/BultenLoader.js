import { useEffect } from 'react'
import Axios from 'axios'
import { bultenlerState } from '../store'
import { useSetRecoilState } from 'recoil'

function BultenLoader () {
  const setBultenler = useSetRecoilState(bultenlerState)

  useEffect(() => {
    Axios.get('/api/bultenler')
      .then(response => setBultenler(response.data))
  }, [setBultenler])

  return null
}

export default BultenLoader
