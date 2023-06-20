import { useLayoutEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function ProtectedRouteElement({ element }) {
    const isAuthorized = localStorage.getItem('accessToken')
    const navigate = useNavigate()
    const location = useLocation()

    useLayoutEffect(() => {
        if (!isAuthorized && location.pathname === '/profile') navigate('/login')
    }, [isAuthorized, location.pathname, navigate])

    return element
}
