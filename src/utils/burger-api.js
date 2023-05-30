const API_URL = 'https://norma.nomoreparties.space/api'


export async function getIngredients() {
    return fetch(`${API_URL}/ingredients`)
    .then(res => {
        if (res.ok) return res.json()
        else throw new Error()
    })
    .then(result => result.data)
    .catch(err => alert(err))
}
