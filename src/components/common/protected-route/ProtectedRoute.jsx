import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import Loader from '../loader/Loader'

const Protected = ({ onlyUnAuth = false, component }) => {
    const isAuthChecked = useSelector(store => store.profile.isAuthChecked)
    const user = useSelector(store => store.profile.userInfo)
    const location = useLocation()

    if (!isAuthChecked) {
        return <Loader />
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: '/' } }
        return <Navigate to={from} />
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to='/login' state={{ from: location }} />
    }

    return component
}

export const OnlyAuth = Protected
export const OnlyUnAuth = ({ component }) => <Protected onlyUnAuth={true} component={component} />
