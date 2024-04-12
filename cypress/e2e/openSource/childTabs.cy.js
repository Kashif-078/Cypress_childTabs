/// <reference types="cypress" />

describe('Iterate over each cell in Table', () => {
    
    // This hook will execute once before execution of any other test case
    before(() => {
        cy.intercept('https://testautomationu.applitools.com').as('TAU_homePage') // Using Alias
        cy.visit('https://testautomationu.applitools.com')
        cy.wait('@TAU_homePage') // Implicit Waiting
    })

    context('Handling Child Tabs', () => {

        // This "before each" hook runs before executing each test case within this context block
        beforeEach(() => {
            cy.url().should('eq', 'https://testautomationu.applitools.com/')
                .and('include', 'testautomationu.applitools.com')
        })
        
        it('Handle child tab by removing \'target\' attribute', () => {
            cy.get('div#app header nav.nav-links div:last a')
                .invoke('removeAttr', 'target')
                .click()
        })

        it('Handle child tab by visiting link', () => {
            cy.get('div#app header nav.nav-links div:last a')
            .then(($link) => {
                const href = $link.prop('href')
                cy.visit(href)
            })
        })

        // This "after each" hook runs after executing each test case within this context block
        afterEach(() => {
            cy.url().should('include', 'https://testautomationu.slack.com')
            cy.go('back')
        })
        
    })  // End Context Block

    // Loop through each link within the div and click them one by one,
    // ensuring they don't open in new tabs and navigate back after each click
    it('Handle child tabs by removing \'target\' attribute from each anchorTag one by one', () => {
        cy.get('div#content a').each(($a) => {
            cy.wrap($a).invoke('removeAttr', 'target').click()
            cy.go('back') // Go back to the original page after each link is clicked
        })
    })
    
    // This hook will execute once after execution of every test case
    after(() => {
        // Do logout or anyother task according to your needs
    }) // End after Hook

}) // End Describe Block