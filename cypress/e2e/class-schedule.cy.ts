describe('Class Schedule Feature', () => {
    beforeEach(() => {
      cy.visit('/schedule');
    });
  
    it('should display class schedule calendar', () => {
      cy.get('[data-testid="calendar"]').should('be.visible');
      cy.get('[data-testid="class-list"]').should('be.visible');
    });
  
    it('should allow class booking', () => {
      cy.get('[data-testid="class-card"]').first().click();
      cy.get('[data-testid="booking-modal"]').should('be.visible');
      cy.get('[data-testid="book-button"]').click();
      cy.get('[data-testid="success-message"]').should('be.visible');
    });
  
    it('should show waitlist option for full classes', () => {
      cy.get('[data-testid="full-class"]').click();
      cy.get('[data-testid="waitlist-button"]').should('be.visible');
    });
  });