import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadIngredient } from './store/ingredientListSlice'

import Header from './components/common/header/Header'
import Constructor from './pages/constructor/Constructor'
import Modal from './components/common/modal/Modal'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadIngredient())
    }, [dispatch])

    return (
        <>
            <Header />

            <main>
                <Constructor />
            </main>

            <Modal />
        </>
    )
}

export default App
