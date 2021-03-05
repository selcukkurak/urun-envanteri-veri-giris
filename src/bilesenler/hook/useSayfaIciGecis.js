import {useState} from 'react'

export default function useSayfaIciGecis() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [genel, setGenel] = useState(true)

  const [idariGenel, setIdariGenel] = useState(true)

  const [idariTablo, setIdariTablo] = useState(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [cikti, setCikti] = useState(false)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [girdi, setGirdi] = useState(false)

  const genelIdariSayfaClick = () => {
    setIdariGenel(true)
    setIdariTablo(false)
  }

  const tabloIdariSayfaClick = () => {
    setIdariGenel(false)
    setIdariTablo(true)
  }
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

  return {
    genel,
    cikti,
    girdi,
    idariGenel,
    idariTablo,
    genelIdariSayfaClick,
    tabloIdariSayfaClick,
    genelSayfaClick,
    ciktiSayfaClick,
    girdiSayfaClick,
  }
}