import type { FC, ReactElement } from 'react'

import { useAppSelector } from '../../../utils/hooks'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from '../loader/Loader'
import { profileSelector } from '../../../utils/selectors'

import { LOGIN_PAGE } from '../../../utils/constants'

interface IProtectedProps {
    readonly onlyUnAuth?: boolean
    readonly component: ReactElement
}

const Protected: FC<IProtectedProps> = ({ onlyUnAuth = false, component }) => {
    const { isAuthChecked, userInfo } = useAppSelector(profileSelector)
    const location = useLocation()

    if (!isAuthChecked) {
        return <Loader />
    }

    if (onlyUnAuth && userInfo) {
        const { from } = location.state || { from: { pathname: '/' } }
        return <Navigate to={from} />
    }

    if (!onlyUnAuth && !userInfo) {
        return <Navigate to={LOGIN_PAGE} state={{ from: location }} />
    }

    return component
}

export const OnlyAuth = Protected
export const OnlyUnAuth: FC<{ component: ReactElement }> = ({ component }) => (
    <Protected onlyUnAuth={true} component={component} />
)
