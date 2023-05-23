import AppHeader from './componenets/app-header/AppHeader'
import ContentWrapper from './componenets/common/content-wrapper/ContentWrapper'
import Constructor from './componenets/pages/constructor/Constructor'

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
