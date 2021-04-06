import { useEffect, useState } from 'react'

export default function useYanMenu(){
  const [acik, setAcik] = useState(true)
  const [boy, setBoy] = useState(window.innerWidth);
  const handleYanMenuClick = () => {
    setAcik(!acik)
  }
  const handleWindowResize = () => {
    setBoy(window.innerWidth);

  }
  useEffect(() => {
    if(boy < 750){
      setAcik(false)
    }
    else setAcik(true)
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [boy]);
  return {
    acik,
    boy,
    setAcik,
    handleYanMenuClick
  }
}