describe('Kvízoldal tests', () => {
  //###################################################################################
  let user = "almafej87" //REVRITE THIS BEFORE TEST

  it('Reaches Website', () => {
    
    cy.visit('http://localhost:3000')
  })
  it("Logs in",()=>{
    
    cy.visit('http://localhost:3000')
    cy.get('[data-has-helper="true"] > .tap-highlight-transparent').type("asd@gmail.com")
    cy.get('.KvizoldalLogin_inputWrapper__jlkvs > :nth-child(2) > .relative').type("asd12345").type("{enter}")
    cy.wait(1000)
    cy.url().should('include', '/quiz')
  })
  it("Signs up",()=>{
    
    //Must change variable user to pass
    cy.visit('http://localhost:3000')
    cy.get('.KvizoldalLogin_registerLink__aBhjX').click({ force: true })
    cy.wait(1000)
    cy.url().should('include', '/authentication/register')
    cy.get(':nth-child(1) > .relative').type(user)
    cy.get('.inputField > .tap-highlight-transparent > .inline-flex').type(user+'@gmail.com')
    cy.get(':nth-child(3) > .relative > .inline-flex').type(user)
    cy.get(':nth-child(4) > .relative > .inline-flex').type(user)
    cy.wait(1000)
    cy.get('.z-0').click({ force: true })
    cy.wait(1000)
    cy.url().should('include', '/quiz')
  })
  
  it("Search",()=>{
    
    cy.visit('http://localhost:3000')
    cy.get('[data-has-helper="true"] > .tap-highlight-transparent').type("asd@gmail.com")
    cy.get('.KvizoldalLogin_inputWrapper__jlkvs > :nth-child(2) > .relative').type("asd12345").type("{enter}")
    
    cy.wait(1000)

    cy.get('.Header_customInput__vZg_S').type("asd")
    cy.wait(2000)
    cy.get(':nth-child(1) > .flex-auto > .m-2 > :nth-child(1)').contains("asd")
    cy.wait(2000)
  })
  it("Sort by Category",()=>{
    
    cy.visit('http://localhost:3000')
    cy.get('[data-has-helper="true"] > .tap-highlight-transparent').type("asd@gmail.com")
    cy.get('.KvizoldalLogin_inputWrapper__jlkvs > :nth-child(2) > .relative').type("asd12345").type("{enter}")
    cy.wait(1000)
    cy.get('.Header_catdropdowndiv2___B88f').click({ force: true })
    cy.wait(1000)
    
    cy.get('.z-10 > .gap-1').contains("Matematika").click({ force: true })
    cy.wait(1000)
  })
  it("Sort by Difficulty",()=>{
  
    cy.visit('http://localhost:3000')
    cy.get('[data-has-helper="true"] > .tap-highlight-transparent').type("asd@gmail.com")
    cy.get('.KvizoldalLogin_inputWrapper__jlkvs > :nth-child(2) > .relative').type("asd12345").type("{enter}")
    cy.wait(1000)
    cy.get('.Header_catdropdowndivnofill__Tjd_Y').click({ force: true })
    cy.wait(1000)
    cy.get('.z-10 > .gap-1').contains("Könnyű").click({ force: true })
    cy.wait(4000)
  })
  it("Create new quizz",()=>{
    
    cy.visit('http://localhost:3000')
    cy.get('[data-has-helper="true"] > .tap-highlight-transparent').type("asd@gmail.com")
    cy.get('.KvizoldalLogin_inputWrapper__jlkvs > :nth-child(2) > .relative').type("asd12345").type("{enter}")
    cy.wait(1000)
    cy.get('.Header_navigation__lKjgu > .z-0 > span').click({ force: true })
    cy.wait(1000)
    cy.get('.bg-success').click({ force: true })
    cy.wait(1000)
    cy.get('.Toastify__toast-body').contains("Kérjük, töltsd ki az összes kötelező mezőt.")
    cy.wait(3000  )
    
    cy.get('#quiz-description').type("U4SBQ0G7bv_EgUNZ3shU")
    cy.get('#category').click({ force: true })
    cy.get('.overflow-y-auto > .gap-1').contains("matematika").click({ force: true })
    cy.wait(1000)
    cy.contains("Válassz nehézséget").click({ force: true })
    cy.get('.overflow-y-auto > .gap-1').contains("Könnyű").click({ force: true })
    cy.wait(1000)
    cy.get('.bg-success').click({ force: true })
    cy.wait(1000)
    cy.get('.Toastify__toast-body').contains("Legalább 1 kérdés hozzáadása közelező.")
    cy.get('.CreateQuizModal_questionsSection__1bliE > .z-0').click({ force: true })
    cy.get('#question-text-0').type("Kérdés1")
    cy.get('#answers-0').type("a;b;c;d")
    cy.get('.bg-success').click({ force: true })
    cy.get('.Toastify__toast-body').contains("Kérjük, töltsd ki az összes mezőt a(z) 1. kérdéshez.")
    cy.wait(1000)
    cy.get('#correct-answer-0').type("a")
    cy.get('.bg-success').click({ force: true })
    cy.get('.Toastify__toast-body').contains("Kvíz sikeresen létrehozva! Adminisztrátor jóváhagyásra vár.")
    cy.wait(1000)
  })
  it("Edit Profile",()=>{
    
    cy.visit('http://localhost:3000')
    cy.get('[data-has-helper="true"] > .tap-highlight-transparent').type("asd@gmail.com")
    cy.get('.KvizoldalLogin_inputWrapper__jlkvs > :nth-child(2) > .relative').type("asd12345").type("{enter}")
    
    cy.get('img').click({ force: true })
    cy.wait(1000)
    cy.get('.gap-4 > :nth-child(3)').click({ force: true })
    cy.get('.flex-wrap > :nth-child(2) > .rounded-full').click({ force: true,multiple:true })
    cy.get('.relative > .inline-flex').type(user)
    cy.wait(1000)
    cy.get('.flex-row > .bg-primary').click({ force: true })
    cy.wait(1000)
  })
  it("Edit Quizz",()=>{
    
    cy.visit('http://localhost:3000')
    cy.get('[data-has-helper="true"] > .tap-highlight-transparent').type("asd@gmail.com")
    cy.get('.KvizoldalLogin_inputWrapper__jlkvs > :nth-child(2) > .relative').type("asd12345").type("{enter}")
    
    cy.get('img').click({ force: true })
    cy.wait(1000)
    cy.get('.gap-4 > :nth-child(2)').click({ force: true })
    cy.wait(1000)
    cy.get('ul > :nth-child(1) > .bg-primary').click({ force: true })
    cy.wait(1000)
    cy.get('.group > .relative').type("plusz")
    cy.wait(1000)
    cy.get('.flex.flex-row > .bg-primary').click({ force: true })

    cy.get('.Toastify__toast-body').contains("Kvíz sikeresen frissítve! Adminisztrátor jóváhagyásra vár.")
    cy.wait(1000)
  })

  it("Delete quiz",()=>{
    
    cy.visit('http://localhost:3000')
    cy.get('[data-has-helper="true"] > .tap-highlight-transparent').type("asd@gmail.com")
    cy.get('.KvizoldalLogin_inputWrapper__jlkvs > :nth-child(2) > .relative').type("asd12345").type("{enter}")
    
    cy.get('img').click({ force: true })
    cy.wait(1000)
    cy.get('.gap-4 > :nth-child(2)').click({ force: true })
    cy.wait(1000)
    cy.get(':nth-child(1) > .bg-danger').click({ force: true })

    cy.get('.Toastify__toast-body').contains("Kvíz sikeresen törölve!")
    cy.wait(1000)
  })

  it("Logs in as admin",()=>{
    
    cy.visit('http://localhost:3000')
    cy.get('[data-has-helper="true"] > .tap-highlight-transparent').type("admin@gmail.com")
    cy.get('.KvizoldalLogin_inputWrapper__jlkvs > :nth-child(2) > .relative').type("admin12345").type("{enter}")
    cy.wait(1000)
    
  })
  it("Complete quiz",()=>{
    
    cy.visit('http://localhost:3000')
    cy.get('[data-has-helper="true"] > .tap-highlight-transparent').type("asd@gmail.com")
    cy.get('.KvizoldalLogin_inputWrapper__jlkvs > :nth-child(2) > .relative').type("asd12345").type("{enter}")
    cy.wait(1000)
    cy.visit('http://localhost:3000/quiz/7CZFA')
    //cy.get(':nth-child(1) > .rounded-b-large > :nth-child(1) > .z-0').click({ force: true })
    cy.wait(3000)
    cy.get('.answers-div > :nth-child(1)').click({ force: true })
    cy.wait(3000)
    cy.get('.answers-div > :nth-child(1)').click({ force: true })
    cy.wait(3000)
    cy.get('.answers-div > :nth-child(2)').click({ force: true })
    cy.wait(3000)
    cy.get('.answers-div > :nth-child(3)').click({ force: true })
    cy.wait(3000)
    cy.get('.answers-div > :nth-child(2)').click({ force: true })
    cy.wait(3000)
    cy.get('.center-col > .overflow-hidden').contains("Gratulálunk!")
    cy.wait(1000)
    cy.get('.Header_navigation__lKjgu > .flex > .z-0').click({ force: true })
  })
  it("Check out Leaderboard",()=>{
    
    cy.visit('http://localhost:3000')
    cy.get('[data-has-helper="true"] > .tap-highlight-transparent').type("asd@gmail.com")
    cy.get('.KvizoldalLogin_inputWrapper__jlkvs > :nth-child(2) > .relative').type("asd12345").type("{enter}")
    cy.wait(1000)
    cy.get(':nth-child(1) > .rounded-b-large > :nth-child(2) > .z-0').click({ force: true })
    cy.wait(3000)
    cy.contains("Legjobb eredmények: ")
    cy.get('.flex-row > .z-0').click({ force: true })
  })
  
})