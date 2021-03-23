import {useState} from 'react'

export default function useSayfaIciGecis() {

  const [genel, setGenel] = useState(true)

  const [idariGenel, setIdariGenel] = useState(true)

  const [idariTablo, setIdariTablo] = useState(false)

  const [cikti, setCikti] = useState(false)

  const [girdi, setGirdi] = useState(false)

  const [metaveriSayfa, setMetaveriSayfa] = useState(false)

  const [bultenGenel, setBultenGenel] = useState(true)

  const [bultenTablo, setBultenTablo] = useState(false)
  const [bultenIstatistikTablo, setBultenIstatistikTablo] = useState(false)

  const genelIdariSayfaClick = () => {
    setIdariGenel(true)
    setIdariTablo(false)
  }

  const genelBultenSayfaClick = () => {
    setBultenGenel(true)
    setBultenTablo(false)
    setBultenIstatistikTablo(false)
  }
  const tabloBultenSayfaClick = () => {
    setBultenGenel(false)
    setBultenTablo(true)
    setBultenIstatistikTablo(false)
  }

  const istatistikBultenSayfaClick = () => {
    setBultenGenel(false)
    setBultenTablo(false)
    setBultenIstatistikTablo(true)
  }
  const tabloIdariSayfaClick = () => {
    setIdariGenel(false)
    setIdariTablo(true)
  }
  const genelSayfaClick = () => {
    setGenel(true)
    setCikti(false)
    setGirdi(false)
    setMetaveriSayfa(false)
  }

  const ciktiSayfaClick = () => {
    setCikti(true)
    setGenel(false)
    setGirdi(false)
    setMetaveriSayfa(false)
  }

  const girdiSayfaClick = () => {
    setGirdi(true)
    setGenel(false)
    setCikti(false)
    setMetaveriSayfa(false)
  }

  const metaveriSayfaClick = () => {
    setMetaveriSayfa(true)
    setGirdi(false)
    setGenel(false)
    setCikti(false)
  }

  return {
    genel,
    cikti,
    girdi,
    idariGenel,
    idariTablo,
    metaveriSayfa,
    bultenGenel,
    bultenTablo,
    bultenIstatistikTablo,
    genelBultenSayfaClick,
    tabloBultenSayfaClick,
    istatistikBultenSayfaClick,
    metaveriSayfaClick,
    genelIdariSayfaClick,
    tabloIdariSayfaClick,
    genelSayfaClick,
    ciktiSayfaClick,
    girdiSayfaClick,
  }
}