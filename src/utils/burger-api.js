const API_URL = 'https://norma.nomoreparties.space/api'

const checkResponse = (res, rejectWithValue) =>
    res.ok
        ? res.json()
        : res.json().then(err => {
            return rejectWithValue ? rejectWithValue(err) : Promise.reject(err)
        })

const setToken = result => {
    localStorage.setItem('accessToken', result.accessToken.replace('Bearer ', ''))
    localStorage.setItem('refreshToken', result.refreshToken)
}

async function fetchIngredients() {
    const res = await fetch(`${API_URL}/ingredients`)
    const result = await checkResponse(res)
    return result.data
}

async function fetchOrder(ingredientsID) {
    const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        body: JSON.stringify({ ingredients: ingredientsID }),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })

    return await checkResponse(res)
}

async function register(data, { rejectWithValue }) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })

    const result = await checkResponse(res, rejectWithValue)
    if (result.success) setToken(result)

    return result
}

async function logIn(data, { rejectWithValue }) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })

    const result = await checkResponse(res, rejectWithValue)
    if (result.success) setToken(result)

    return result
}

async function logOut({ rejectWithValue }) {
    const res = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })

    const result = await checkResponse(res, rejectWithValue)
    if (result.success) localStorage.clear()

    return result
}

async function getUserData({ rejectWithValue }) {
    return fetchWithRefresh(`${API_URL}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    }, rejectWithValue)
}

async function updateUserData(data, { rejectWithValue }) {
    if (Object.keys(data).length === 0) return rejectWithValue({message: 'Nothing to change'})

    return fetchWithRefresh(`${API_URL}/auth/user`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    }, rejectWithValue)
}

async function forgetPassword(data, { rejectWithValue }) {
    if (data.email === '') return rejectWithValue({message: 'Please enter your email'})

    const res = await fetch(`${API_URL}/password-reset`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })

    return await checkResponse(res, rejectWithValue)
}

async function resetPassword(data, { rejectWithValue }) {
    const res = await fetch(`${API_URL}/password-reset/reset`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })

    return await checkResponse(res, rejectWithValue)
}

async function updateToken() {
    const res = await fetch(`${API_URL}/auth/token`, {
        method: 'POST',
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })

    return await checkResponse(res)
}

async function fetchWithRefresh(url, options, rejectWithValue) {
    try {
        const res = await fetch(url, options)
        return await checkResponse(res)
    } catch (err) {
        if (err.message === 'jwt expired') {
            const refreshData = await updateToken()

            if (!refreshData.success) return Promise.reject(refreshData)
            setToken(refreshData)

            options.headers.authorization = refreshData.accessToken

            const res = await fetch(url, options)
            return await checkResponse(res, rejectWithValue)
        } else {
            return Promise.reject(err)
        }
    }
}

export {
    fetchIngredients,
    fetchOrder,
    register,
    logIn,
    logOut,
    getUserData,
    updateUserData,
    forgetPassword,
    resetPassword,
    fetchWithRefresh,
}
