import type { FC } from 'react'
import { useLayoutEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from './utils/hooks'
import { loadIngredient } from './services/ingredients/action'
import { getUser } from './services/user/action'

import { OnlyAuth, OnlyUnAuth } from './components/common/protected-route/ProtectedRoute'

import Header from './components/common/header/Header'
import Modal from './components/common/modal/Modal'
import ProfileForm from './components/profile-page-components/profile-form/ProfileForm'
import ProfileOrders from './components/profile-page-components/profile-orders/ProfileOrders'
import FullOrderDetails from './components/orders-components/full-order-details/FullOrderDetails'
import IngredientDetails from './components/common/ingredient-details/IngredientDetails'

import {
    Constructor,
    Feed,
    Login,
    Register,
    ForgotPassword,
    ResetPassword,
    Profile,
    ErrorPage,
} from './pages'

import {
    CONSTRUCTOR_PAGE,
    INGREDIENTS_PARAMS_PAGE,
    FEED_PAGE,
    FEED_ORDERS_PAGE,
    PROFILE_PAGE,
    PROFILE_ORDERS_NESTED_PAGE,
    PROFILE_ORDERS_PAGE,
    LOGIN_PAGE,
    REGISTER_PAGE,
    FORGET_PASSWORD_PAGE,
    RESET_PASSWORD_PAGE,
    ORDER_PARAM,
} from './utils/constants'

const App: FC = () => {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const background = location.state && location.state.background

    useLayoutEffect(() => {
        dispatch(getUser())
        dispatch(loadIngredient())
    }, [dispatch])

    function closeModalHandler() {
        navigate(-1)
    }

    return (
        <>
            <Header />
            <main>
                <Routes location={background || location}>
                    <Route path={CONSTRUCTOR_PAGE} element={<Constructor />} />
                    <Route
                        path={INGREDIENTS_PARAMS_PAGE}
                        element={<IngredientDetails />}
                    />

                    <Route path={FEED_PAGE}>
                        <Route index element={<Feed />} />
                        <Route path={`:${ORDER_PARAM}`} element={<FullOrderDetails />} />
                    </Route>

                    <Route path={PROFILE_PAGE} element={<OnlyAuth component={<Profile />} />}>
                        <Route index element={<OnlyAuth component={<ProfileForm />} />} />
                        <Route path={PROFILE_ORDERS_NESTED_PAGE} element={<OnlyAuth component={<ProfileOrders />} />} />
                    </Route>

                    <Route
                        path={PROFILE_ORDERS_PAGE}
                        element={<OnlyAuth component={<FullOrderDetails />} />}
                    />

                    <Route path={LOGIN_PAGE} element={<OnlyUnAuth component={<Login />} />} />
                    <Route path={REGISTER_PAGE} element={<OnlyUnAuth component={<Register />} />} />
                    <Route
                        path={FORGET_PASSWORD_PAGE}
                        element={<OnlyUnAuth component={<ForgotPassword />} />}
                    />
                    <Route
                        path={RESET_PASSWORD_PAGE}
                        element={<OnlyUnAuth component={<ResetPassword />} />}
                    />
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
            </main>

            {background && (
                <Routes>
                    <Route
                        path={INGREDIENTS_PARAMS_PAGE}
                        element={
                            <Modal onClose={closeModalHandler}>
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                    <Route
                        path={FEED_ORDERS_PAGE}
                        element={
                            <Modal onClose={closeModalHandler}>
                                <FullOrderDetails />
                            </Modal>
                        }
                    />
                    <Route
                        path={PROFILE_ORDERS_PAGE}
                        element={
                            <Modal onClose={closeModalHandler}>
                                <FullOrderDetails />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
    )
}

export default App
