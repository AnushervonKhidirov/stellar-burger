import type { FC, ReactElement } from 'react'
import type { IUserInfo } from '../../../utils/interfaces'

import { useAppSelector } from '../../../utils/hooks'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from '../loader/Loader'

interface ProtectedProps {
    onlyUnAuth?: boolean
    component: ReactElement
}

const Protected: FC<ProtectedProps> = ({ onlyUnAuth = false, component }) => {
    const isAuthChecked = useAppSelector<boolean>(store => store.profile.isAuthChecked)
    const user = useAppSelector<IUserInfo | null>(store => store.profile.userInfo)
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
