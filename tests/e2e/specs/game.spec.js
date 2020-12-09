describe('Game menu', () => {
    it('shows game menu first', () => {
        cy.visit('/')
            .location()
            .should((loc) => {
                expect(loc.pathname).to.eq('/');
            });
    });
    it('is possible to choose a category', () => {
        cy.visit('/')
            .get('[data-cy=category]')
            .eq(14)
            .contains('General Knowledge')
            .should('not.have.class', 'has-text-weight-bold')
            .get('[data-cy=category]')
            .eq(14)
            .click()
            .contains('General Knowledge')
            .should('have.class', 'has-text-weight-bold');
    });
});
describe('Game play', () => {
    it('should be on game route when playing', () => {
        cy.visit('/')
            .get('[data-cy=startButton]')
            .click()
            .location()
            .should((loc) => {
                expect(loc.pathname).to.eq('/');
            });
    });
    it('should contain questions, aswers and lifelines when playing', () => {
        cy.visit('/')
            .get('[data-cy=startButton]')
            .click()
            .get('[data-cy=answer]')
            .its('length')
            .should('be', 4)
            .get('[data-cy=question]')
            .should('be.visible')
            .get('[data-cy=lifeline]')
            .its('length')
            .should('be', 2);
    });
    it('questions should have a timer counting down', () => {
        cy.visit('/')
            .get('[data-cy=startButton]')
            .click()
            .get('[data-cy=timeLeft]')
            // TODO: Better check countdown as this is prone to timing issues
            .contains(15)
            .contains(14)
            .contains(13);
    });
});
describe('Lifelines', () => {
    it('removes two incorrect answers when clicking the 50/50 lifleline', () => {
        cy.visit('/')
            .get('[data-cy=startButton]')
            .click()
            .get('[data-cy=lifeline]')
            .first()
            .click()
            .get('[data-cy=answer]')
            .its('length')
            .should('be', 2);
    });
    it('adds ten senconds when clicking the +10s lifleline', () => {
        cy.visit('/')
            .get('[data-cy=startButton]')
            .click()
            .get('[data-cy=lifeline]')
            .last()
            .click()
            .get('[data-cy=answer]')
            .its('length')
            .should('be', 4)
            .get('[data-cy=timeLeft]')
            // TODO: Better check countdown as this is prone to timing issues
            .contains(25);
    });
});
describe('Game summary', () => {
    it('should be on game summary route and show summary table when finished playing', () => {
        cy.visit('/')
            .get('[data-cy=startButton]')
            .click()
            .answer(1)
            .answer(3)
            .answer(4)
            .answer(1)
            .answer(2)
            .answer(4)
            .answer(1)
            .answer(2)
            .answer(2)
            .answer(1)
            .location()
            .should((loc) => {
                expect(loc.pathname).to.eq('/summary');
            })
            .get('[data-cy=summaryRow]')
            .its('length')
            .should('be.greaterThan', 3);
    });
    it('should be able to restart game after finishing playing', () => {
        cy.visit('/')
            .get('[data-cy=startButton]')
            .click()
            .answer(1)
            .answer(3)
            .answer(4)
            .answer(1)
            .answer(2)
            .answer(4)
            .answer(1)
            .answer(2)
            .answer(2)
            .answer(1)
            .get('[data-cy=playAgain]')
            .click()
            .location()
            .should((loc) => {
                expect(loc.pathname).to.eq('/');
            })
            .get('[data-cy=startButton]')
            .should('be.visible');
    });
});
