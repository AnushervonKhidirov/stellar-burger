import { useLayoutEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadIngredient } from './services/store/ingredientListSlice'
import { getUser } from './services/user/action'

import { closeModal } from './services/store/modalSlice'

import { OnlyAuth, OnlyUnAuth } from './components/common/protected-route/ProtectedRoute'

import Header from './components/common/header/Header'
import Modal from './components/common/modal/Modal'
import ProfileForm from './components/profile-page-components/profile-form/ProfileForm'

import IngredientDetails from './components/common/ingredient-details/IngredientDetails'

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
    const location = useLocation()
    const navigate = useNavigate()
    const background = location.state && location.state.background

    useLayoutEffect(() => {
        dispatch(getUser())
        dispatch(loadIngredient())
    }, [dispatch])

    function closeModalHandler() {
        background && navigate(-1)
        dispatch(closeModal())
    }

    return (
        <>
            <Header />
            <main>
                <Routes location={background || location}>
                    <Route path='/' element={<Constructor />} />
                    <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
                    <Route path='/profile' element={<OnlyAuth component={<Profile />} />}>
                        <Route index element={<OnlyAuth component={<ProfileForm />} />} />
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

            {background && (
                <Routes>
                    <Route path='/ingredients/:ingredientId' element={<Modal onClose={closeModalHandler} withUrl><IngredientDetails /></Modal>} />
                </Routes>
            )}

           {!background && <Modal onClose={closeModalHandler} />}
        </>
    )
}

export default App
