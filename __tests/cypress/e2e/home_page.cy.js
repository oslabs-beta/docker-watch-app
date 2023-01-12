describe('Web Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })
  
  it('displays containers', () => {
    cy.visit('/')
    cy.get('button').should('have.length.gt', 3)
  })

  it('displays graphs', () => {
    cy.visit('/')
    cy.contains('web').click()
    cy.get('canvas').should('have.length', 4)
  })
})