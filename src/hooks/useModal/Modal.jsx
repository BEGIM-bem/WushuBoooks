import React from 'react'
import CreateLobbyModal from '../../pages/Chat/components/CreateLobbyModal/CreateLobbyModal'

const modalList = {
    'new_direct': <CreateLobbyModal />
}

const Modal = ({store, props}) => {
    const Modal = modalList[store.type]
    return 
    // return <>{Modal}</>
}

export default Modal