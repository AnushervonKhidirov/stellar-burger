import { useReducer } from 'react'
import { ModalContext } from './utils/context'
import AppHeader from './components/app-header/AppHeader'
import Constructor from './components/pages/constructor/Constructor'
import Modal from './components/common/modal/Modal'

function App() {
    const initialModalState = {
        isOpen: false,
        modalInner: null,
    }
    const [modalState, modalDispatch] = useReducer(modalHandlerReducer, initialModalState)

    function modalHandlerReducer(state, action) {
        if (action.type === 'open') {
            return {
                isOpen: true,
                modalInner: action.payload,
            }
        } else if (action.type === 'close') {
            return initialModalState
        } else {
            throw new Error(`Wrong type of action: ${action.type}`)
        }
    }

    return (
        <ModalContext.Provider value={{ modalState, modalDispatch }}>
            <AppHeader />
            <main>
                <Constructor />
            </main>

            {modalState.isOpen && <Modal />}
        </ModalContext.Provider>
    )
}

export default App
