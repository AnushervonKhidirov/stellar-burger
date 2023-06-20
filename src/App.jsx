import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadIngredient } from './store/ingredientListSlice'

import Header from './components/common/header/Header'
import Modal from './components/common/modal/Modal'
import ProtectedRouteElement from './components/common/protected-route-element/ProtectedRouteElement'

import {
    Constructor,
    Login,
    Register,
    ForgotPassword,
    ResetPassword,
    Profile,
    ErrorPage,
} from './pages'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadIngredient())
    }, [dispatch])

    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path='/' element={<Constructor />} />
                    <Route path='/profile' element={<ProtectedRouteElement element={<Profile />} />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/reset-password' element={<ResetPassword />} />
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
            </main>

            <Modal />
        </Router>
    )
}

export default App
