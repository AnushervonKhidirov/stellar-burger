const API_URL = 'https://norma.nomoreparties.space/api'

const checkResponse = res => (res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

function fetchIngredients(rejectWithValue) {
    return fetch(`${API_URL}/ingredients`)
        .then(res => checkResponse(res))
        .then(result => result.data)
        .catch(() => rejectWithValue())
}

function fetchOrder(ingredientsID, rejectWithValue) {
    return fetch(`${API_URL}/orders`, {
        method: 'POST',
        body: JSON.stringify({ ingredients: ingredientsID }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => checkResponse(res))
        .catch(() => rejectWithValue())
}

function register(data, rejectWithValue) {
    return fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => checkResponse(res))
        .catch(() => rejectWithValue())
}

function logIn(data, rejectWithValue) {
    return fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => checkResponse(res))
        .catch(() => rejectWithValue())
}

function logOut(rejectWithValue) {
    const rToken = localStorage.getItem('refreshToken')

    return fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        body: JSON.stringify({ token: rToken }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => checkResponse(res))
        .catch(() => rejectWithValue())
}

function updateToken(rejectWithValue) {
    const rToken = localStorage.getItem('refreshToken')

    return fetch(`${API_URL}/auth/token`, {
        method: 'POST',
        body: JSON.stringify({ token: rToken }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => checkResponse(res))
        .catch(() => rejectWithValue())
}

function getUserData(rejectWithValue) {
    return fetch(`${API_URL}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
    })
        .then(res => checkResponse(res))
        .catch(() => rejectWithValue())
}

function updateUserData(data, rejectWithValue) {
    return fetch(`${API_URL}/auth/user`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
    })
        .then(res => checkResponse(res))
        .catch(() => rejectWithValue())
}

export {
    fetchIngredients,
    fetchOrder,
    register,
    logIn,
    logOut,
    updateToken,
    getUserData,
    updateUserData,
}
