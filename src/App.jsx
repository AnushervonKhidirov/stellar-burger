import { useState } from 'react'
import AppHeader from './components/app-header/AppHeader'
import ContentWrapper from './components/common/content-wrapper/ContentWrapper'
import Constructor from './components/pages/constructor/Constructor'
import Modal from './components/common/modal/Modal'
import ModalIngredient from './components/common/modal/modal-ingredient/ModalIngredient'

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalIngredient, setModalIngredient] = useState({
        _id: '60666c42cc7b410027a1a9b5',
        name: 'Говяжий метеорит (отбивная)',
        type: 'main',
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
        __v: 0,
    })

    function modalHandler(ingredient) {
        setIsModalOpen(!isModalOpen)
        ingredient ? setModalIngredient(ingredient) : setModalIngredient({})
    }

    document.onkeydown = e => {
        if (e.key === 'Escape' && isModalOpen === true) modalHandler()
    }

    return (
        <>
            <AppHeader />
            <main>
                <ContentWrapper>
                    <Constructor modalHandler={modalHandler} />
                </ContentWrapper>
            </main>

            {isModalOpen && (
                <Modal modalHandler={modalHandler}>
                    <ModalIngredient ingredient={modalIngredient} />
                </Modal>
            )}
        </>
    )
}

export default App
