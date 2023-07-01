import type { ReactElement } from 'react'

import { useAppSelector } from '../../../utils/hooks'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from '../loader/Loader'


interface ProtectedProps {
    onlyUnAuth?: boolean
    component: ReactElement
}

const Protected = ({ onlyUnAuth = false, component }: ProtectedProps): ReactElement => {
    const isAuthChecked = useAppSelector(store => store.profile.isAuthChecked)
    const user = useAppSelector(store => store.profile.userInfo)
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
export const OnlyUnAuth = ({ component }: { component: ReactElement }) => (
    <Protected onlyUnAuth={true} component={component} />
)
