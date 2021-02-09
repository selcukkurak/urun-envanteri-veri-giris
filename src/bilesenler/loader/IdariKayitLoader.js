import { useEffect } from 'react'
import Axios from 'axios'
import {idariKayitlarState} from '../store'
import { useSetRecoilState } from 'recoil'

function IdariKayitLoader () {
    const setIdariKayitlar = useSetRecoilState(idariKayitlarState)

    useEffect(() => {
        Axios.get('/api/idari-kayitlar')
            .then(response => setIdariKayitlar(response.data))
    }, [setIdariKayitlar])

    return null
}

export default IdariKayitLoader
