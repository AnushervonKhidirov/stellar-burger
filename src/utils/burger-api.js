const API_URL = 'https://norma.nomoreparties.space/api'

const checkResponse = res => (res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

export function fetchIngredients(rejectWithValue) {
    return fetch(`${API_URL}/ingredients`)
        .then(res => checkResponse(res))
        .then(result => result.data)
        .catch(() => rejectWithValue())
}

export function fetchOrder(ingredientsID, rejectWithValue) {
    const body = { ingredients: ingredientsID }

    return fetch(`${API_URL}/orders`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => checkResponse(res))
        .catch(() => rejectWithValue())
}
