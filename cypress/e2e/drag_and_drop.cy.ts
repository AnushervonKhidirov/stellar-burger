
describe('My First Test', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080)

        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' })
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder')

        window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'))
        window.localStorage.setItem('accessToken', JSON.stringify('test-accessToken'))
    })

    it('visit my site', () => {
        cy.visit('/')

		cy.get(`[data-testid='ingredient_item-643d69a5c3f7b9001cfa093c']`).trigger('dragstart')
		cy.get(`[data-testid='constructor_block']`).trigger('drop')
			.get(`[data-testid='ingredient_item-643d69a5c3f7b9001cfa093c']`).should('be.visible')
		

		cy.get(`[data-testid='ingredient_item-643d69a5c3f7b9001cfa0940']`).trigger('dragstart')
		cy.get(`[data-testid='constructor_block']`).trigger('drop')
			.get(`[data-testid='ingredient_item-643d69a5c3f7b9001cfa0940']`).should('be.visible')

		cy.get(`[data-testid='ingredient_item-643d69a5c3f7b9001cfa093e']`).trigger('dragstart')
		cy.get(`[data-testid='constructor_block']`).trigger('drop')
			.get(`[data-testid='ingredient_item-643d69a5c3f7b9001cfa093e']`).should('be.visible')

		cy.get(`[data-testid='constructor_ingredient-643d69a5c3f7b9001cfa093e'] .constructor-element__action`).trigger('click')
			.get(`[data-testid='constructor_ingredient-643d69a5c3f7b9001cfa093e']`).should('not.exist')
	})
})
