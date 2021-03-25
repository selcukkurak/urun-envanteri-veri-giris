import { useState } from 'react'

export default function useYanMenu(){
  const [acik, setAcik] = useState(true)

  const handleYanMenuClick = () => {
    setAcik(!acik)
  }

  return {
    acik,
    handleYanMenuClick
  }
}