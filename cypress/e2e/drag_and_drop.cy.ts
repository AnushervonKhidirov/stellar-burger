describe('drag and drop testing', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' })
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder')

        window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'))
        window.localStorage.setItem('accessToken', JSON.stringify('test-accessToken'))
    })

    it('add ingredient to constructor', () => {
        const modal = cy.get('[data-testid="modal"]').should('not.exist')

        cy.get(`[data-testid='ingredient_item-643d69a5c3f7b9001cfa093c']`).trigger('dragstart')
        cy.get(`[data-testid='constructor_block']`)
            .trigger('drop')
            .get(`[data-testid='ingredient_item-643d69a5c3f7b9001cfa093c']`)
            .should('exist')

        cy.get(`[data-testid='ingredient_item-643d69a5c3f7b9001cfa0940']`).trigger('dragstart')
        cy.get(`[data-testid='constructor_block']`)
            .trigger('drop')
            .get(`[data-testid='ingredient_item-643d69a5c3f7b9001cfa0940']`)
            .should('exist')

        cy.get(`[data-testid='ingredient_item-643d69a5c3f7b9001cfa093e']`).trigger('dragstart')
        cy.get(`[data-testid='constructor_block']`)
            .trigger('drop')
            .get(`[data-testid='ingredient_item-643d69a5c3f7b9001cfa093e']`)
            .should('exist')

        cy.get(
            `[data-testid='constructor_ingredient-643d69a5c3f7b9001cfa093e'] .constructor-element__action`
        )
            .click()
            .get(`[data-testid='constructor_ingredient-643d69a5c3f7b9001cfa093e']`)
            .should('not.exist')

        cy.get('[data-testid="submit_order"]').click()
        modal.should('exist')

        cy.get('[data-testid="close_modal"]').click()
        modal.should('not.exist')
    })
})
