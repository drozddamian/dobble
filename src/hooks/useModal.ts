import { RefObject, useEffect, useState } from 'react'


interface HookResult {
  isModalVisible: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

export const useModal = (ref: RefObject<any>): HookResult => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleOpenModal = () => setIsModalVisible(true)
  const handleCloseModal = () => setIsModalVisible(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleCloseModal()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  return {
    isModalVisible,
    handleOpenModal,
    handleCloseModal,
  }
}
