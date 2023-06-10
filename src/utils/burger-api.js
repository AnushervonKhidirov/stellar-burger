const API_URL = 'https://norma.nomoreparties.space/api'

export function fetchIngredients(rejectWithValue) {
    return fetch(`${API_URL}/ingredients`)
        .then(res => {
            if (res.ok) return res.json()
            else throw new Error()
        })
        .then(result => result.data)
        .catch(() => rejectWithValue())
}

export function fetchOrder(ingredientsID, rejectWithValue) {
    const body = { ingredients: ingredientsID }

    return fetch(`${API_URL}/orders`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(res => {
            if (res.ok) return res.json()
            else throw new Error()
        })
        .then(result => result)
        .catch(() => rejectWithValue())
}
