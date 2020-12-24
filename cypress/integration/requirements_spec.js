describe('Application requirements', () => {

    it('Shows admin login page when not logged in', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Admin Login');
    });

    it('Sign in and Show list of students', () => {
        cy.get('input:first').type('admin@xyz.com');
        cy.get('input:nth-of-type(2').type('hf7rytrgt');
        cy.get('button').click();
        cy.contains('Mark Spencer')
    });

    it('Click on a list item and display courses for the student', () => {
        cy.get('.item:first').click();
        cy.get('div[style="display: block;"]:first').within(
            () => {
                cy.contains('ACE 301')
            }
        )
    });

    it('Choose a course for a student', () => {
        cy.get('div[style="display: block;"]:first').within(
            () => {
                cy.get('input:first').type('CIE 307');
                cy.get('button').click();
                cy.contains('CIE 307');
            }
        )
    });
})

after(() => {
    cy.request('http://localhost:3000/api/clean_test_data')
})