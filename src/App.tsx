import AppHeader from './components/app-header/AppHeader'
import ContentWrapper from './components/common/content-wrapper/ContentWrapper'
import Constructor from './components/pages/constructor/Constructor'

function App() {
    return (
        <>
            <AppHeader />
            <main>
                <ContentWrapper>
                    <Constructor />
                </ContentWrapper>
            </main>
        </>
    )
}

export default App
