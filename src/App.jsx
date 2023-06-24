import { useLayoutEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadIngredient } from './services/store/ingredientListSlice'
import { getUser } from './services/user/action'

import { OnlyAuth, OnlyUnAuth } from './components/common/protected-route/ProtectedRoute'

import Header from './components/common/header/Header'
import Modal from './components/common/modal/Modal'
import ProfileForm from './components/profile-page-components/profile-form/ProfileForm'

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

    useLayoutEffect(() => {
        dispatch(getUser())
        dispatch(loadIngredient())
    }, [dispatch])

    return (
            <Router>
                <Header />
                <main>
                    <Routes>
                        <Route path='/' element={<Constructor />} />
                        <Route path='/profile' element={<OnlyAuth component={<Profile />} />}>
                            <Route path='' element={<OnlyAuth component={<ProfileForm />} />} />
                        </Route>
                        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
                        <Route path='/register' element={<OnlyUnAuth component={<Register />} />} />
                        <Route
                            path='/forgot-password'
                            element={<OnlyUnAuth component={<ForgotPassword />} />}
                        />
                        <Route
                            path='/reset-password'
                            element={<OnlyUnAuth component={<ResetPassword />} />}
                        />
                        <Route path='*' element={<ErrorPage />} />
                    </Routes>
                </main>

                <Modal />
            </Router>
    )
}

export default App
