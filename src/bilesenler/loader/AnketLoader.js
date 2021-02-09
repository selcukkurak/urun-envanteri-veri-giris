import { useEffect } from 'react'
import Axios from 'axios'
import { anketlerState } from '../store'
import { useSetRecoilState } from 'recoil'

function AnketLoader () {
  const setAnketler = useSetRecoilState(anketlerState)

  useEffect(() => {
    Axios.get('/api/anketler')
      .then(response => setAnketler(response.data))
  }, [setAnketler])

  return null
}

export default AnketLoader
