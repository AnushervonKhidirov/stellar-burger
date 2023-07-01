import { useLayoutEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from './utils/hooks'
import { loadIngredient } from './services/store/ingredientListSlice'
import { getUser } from './services/user/action'

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
    const dispatch = useAppDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const background = location.state && location.state.background

    useLayoutEffect(() => {
        dispatch(getUser())
        dispatch(loadIngredient())
    }, [dispatch])

    function closeModalHandler(): void {
        navigate(-1)
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
                    <Route
                        path='/ingredients/:ingredientId'
                        element={
                            <Modal onClose={closeModalHandler}>
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
    )
}

export default App
