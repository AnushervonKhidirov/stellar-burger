export const JWT_EXPIRED_MESSAGE = 'jwt expired'

// Tokens
export const accessToken = localStorage.getItem('accessToken')
export const refreshToken = localStorage.getItem('refreshToken')

// URLs
export const API_URL = 'https://norma.nomoreparties.space/api'
export const INGREDIENTS_URL = `${API_URL}/ingredients`
export const ORDERS_URL = `${API_URL}/orders`
export const REGISTER_URL = `${API_URL}/auth/register`
export const LOGIN_URL = `${API_URL}/auth/login`
export const LOGOUT_URL = `${API_URL}/auth/logout`
export const USER_URL = `${API_URL}/auth/user`
export const UPDATE_TOKEN_URL = `${API_URL}/auth/token`
export const FORGET_PASSWORD_URL = `${API_URL}/password-reset`
export const RESET_PASSWORD_URL = `${API_URL}/password-reset/reset`

// WebSocket URLs
export const WS_ORDERS_URL = 'wss://norma.nomoreparties.space/orders/all'
export const WS_ORDERS_PROFILE_URL = `${WS_ORDERS_URL}?token=${accessToken}`
