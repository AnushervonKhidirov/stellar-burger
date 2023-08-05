export const JWT_EXPIRED_MESSAGE = 'jwt expired'
export const JWT_EXPIRED_MESSAGE_WS = 'Invalid or missing token'

// Tokens
export const getAccessToken = () => localStorage.getItem('accessToken')
export const getRefreshToken = () => localStorage.getItem('refreshToken')

// Route params
export const INGREDIENT_PARAM = 'ingredientId'
export const ORDER_PARAM = 'orderNumber'

// Routes
export const CONSTRUCTOR_PAGE = '/'
export const INGREDIENTS_PAGE = '/ingredients'
export const INGREDIENTS_PARAMS_PAGE = `/ingredients/:${INGREDIENT_PARAM}`
export const FEED_PAGE = '/feed'
export const FEED_ORDERS_PAGE = `/feed/:${ORDER_PARAM}`
export const PROFILE_PAGE = '/profile'
export const PROFILE_ORDERS_NESTED_PAGE = 'orders'
export const PROFILE_ORDERS_PAGE = `/profile/orders/:${ORDER_PARAM}`
export const LOGIN_PAGE = '/login'
export const REGISTER_PAGE = '/register'
export const FORGET_PASSWORD_PAGE = '/forgot-password'
export const RESET_PASSWORD_PAGE = '/reset-password'

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
export const WS_ORDERS_URL = 'wss://norma.nomoreparties.space/orders'
export const WS_ORDERS_FEED_URL = `${WS_ORDERS_URL}/all`
export const WS_ORDERS_PROFILE_URL = `${WS_ORDERS_URL}?token=${getAccessToken()}`
