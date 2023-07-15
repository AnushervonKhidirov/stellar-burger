import type { FC, ReactElement } from 'react'

import { useAppSelector } from '../../../utils/hooks'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from '../loader/Loader'

interface IProtectedProps {
    readonly onlyUnAuth?: boolean
    readonly component: ReactElement
}

const Protected: FC<IProtectedProps> = ({ onlyUnAuth = false, component }) => {
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
export const OnlyUnAuth: FC<{ component: ReactElement }> = ({ component }) => (
    <Protected onlyUnAuth={true} component={component} />
)
