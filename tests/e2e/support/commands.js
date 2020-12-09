// Answer a question (answer 1-4)
Cypress.Commands.add('answer', (answerNumber) =>
    cy
        .get('[data-cy=answer]')
        .eq(answerNumber - 1)
        .click()
);
