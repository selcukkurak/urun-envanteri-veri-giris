import {useState} from 'react'

export default function useSayfaIciGecis() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [genel, setGenel] = useState(true)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [cikti, setCikti] = useState(false)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [girdi, setGirdi] = useState(false)

  const genelSayfaClick = () => {
    setGenel(true)
    setCikti(false)
    setGirdi(false)
  }

  const ciktiSayfaClick = () => {
    setCikti(true)
    setGenel(false)
    setGirdi(false)
  }

  const girdiSayfaClick = () => {
    setGirdi(true)
    setGenel(false)
    setCikti(false)
  }

  return [
    genel,
    cikti,
    girdi,
    genelSayfaClick,
    ciktiSayfaClick,
    girdiSayfaClick,
  ]
}