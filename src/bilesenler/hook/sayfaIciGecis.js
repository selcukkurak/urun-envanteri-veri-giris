import {useState, useCallback} from 'react'

export default function sayfaIciGecis() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [eklemeSayfasi, setEklemeSayfasi] = useState(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [guncellemeSayfasi, setGuncellemeSayfasi] = useState(false)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleEklemeSayfasiGecis = useCallback(() => {
    setEklemeSayfasi(true)
  }, [setEklemeSayfasi])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleListeSayfaGecis = useCallback(() => {
    setEklemeSayfasi(false)
  }, [setEklemeSayfasi])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleGuncellemeSayfasiGecis = useCallback(() => {
    setGuncellemeSayfasi(true)
  }, [setGuncellemeSayfasi])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleListeDonus = useCallback(() => {
    setGuncellemeSayfasi(false)
  }, [setGuncellemeSayfasi])

  return [
    eklemeSayfasi,
    handleEklemeSayfasiGecis,
    handleListeSayfaGecis,
    guncellemeSayfasi,
    handleGuncellemeSayfasiGecis,
    handleListeDonus
  ]
}