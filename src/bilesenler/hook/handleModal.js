import {useState} from 'react'

export default function handleModal(){
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(false)


  const handleClickOpenModal = () => {
    setOpen(true)
  }

  const handleClickCloseModal = () => {
    setOpen(false)
  }

  return [
    open,
    handleClickOpenModal,
    handleClickCloseModal
  ]
}

// export function handleKayitModal(){
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [open, setOpen] = useState(false)
//
//   const handleClickOpenModal = () => {
//     setOpen(true)
//   }
//
//   const handleClickCloseModal = () => {
//     setOpen(false)
//   }
//
//   return [
//     open,
//     handleClickOpenModal,
//     handleClickCloseModal
//   ]
// }
