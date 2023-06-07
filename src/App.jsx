import AppHeader from './components/app-header/AppHeader'
import Constructor from './components/pages/constructor/Constructor'
import Modal from './components/common/modal/Modal'

function App() {
    return (
        <>
            <AppHeader />

            <main>
                <Constructor />
            </main>

            <Modal />
        </>
    )
}

export default App
