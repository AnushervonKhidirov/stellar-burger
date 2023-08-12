
const ingredientDetail = {
	_id: '643d69a5c3f7b9001cfa093c',
	name: 'Краторная булка N-200i',
	type: 'bun',
	proteins: 80,
	fat: 24,
	carbohydrates: 53,
	calories: 420,
	price: 1255,
	image: 'https://code.s3.yandex.net/react/code/bun-02.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
	__v: 0,
}

describe('open modal with ingredient details', () => {
	beforeEach(() => {
		cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' })
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder')

        window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'))
        window.localStorage.setItem('accessToken', JSON.stringify('test-accessToken'))
    })

    it('open ingredient details', () => {
		const modal = cy.get('[data-testid="modal"]').should('not.exist')

		cy.visit('/')
		cy.get(`[data-testid='ingredient_item-${ingredientDetail._id}']`).click()
		
		modal.should('exist')

		cy.get('[data-testid="ingredient_calories"').contains(ingredientDetail.calories)
		cy.get('[data-testid="ingredient_proteins"').contains(ingredientDetail.proteins)
		cy.get('[data-testid="ingredient_fat"').contains(ingredientDetail.fat)
		cy.get('[data-testid="ingredient_carbohydrates"').contains(ingredientDetail.carbohydrates)

		cy.get('[data-testid="close_modal"]').click()

		modal.should('not.exist')
	})
})
